import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class ConstructContainer extends BaseNode {

  // designed for Harvesters...
  constructor() {
    super("ConstructContainer");
  }

  public tick(tick: Tick): number {
    const creep = tick.target as Creep;
    const source = Game.getObjectById<Source | Mineral>(creep.memory.source);
    if (!source) {
      global.log.error("Cannot construct container - no source identified to build next to");
      return b3.State.FAILURE;
    }

    if (creep.pos.isNearTo(source)) {
      // find a suitable location
      const areaArr = _.filter(source.room.lookAtArea(source.pos.y - 1,
          source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true) as LookAtResultWithPos[],
        (pos: LookAtResultWithPos) => {
          return pos.type === "terrain";
        }
      );
      // TODO: at some point we should filter for structures and make sure we have a path...
      const site = _.min(areaArr, p => creep.pos.getRangeTo(p.x, p.y))
      creep.room.createConstructionSite(site.x, site.y, STRUCTURE_CONTAINER);
      return b3.State.SUCCESS;
    }

    return b3.State.FAILURE;
  }
}
