import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class FindConstructionSite extends BaseNode {
  private target_type: string
  private range: number

  constructor(targetType: string, range?: number) {
    super("FindConstructionSite");
    this.target_type = targetType || STRUCTURE_STORAGE;
    this.range = range || 4; // seems reasonable i guess?
  }

  public tick(tick: Tick): number {
    const creep = tick.target as Creep;

    // just get the closest
    const target = creep.pos.findClosestByRange<ConstructionSite>(FIND_MY_CONSTRUCTION_SITES, {
      filter: (site: ConstructionSite) => site !== undefined && site.structureType === this.target_type
    });

    if (target && creep.pos.getRangeTo(target) <= this.range) {
      creep.memory.target = target.id;
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }
}
