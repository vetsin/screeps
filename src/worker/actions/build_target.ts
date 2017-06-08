import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class BuildTarget extends BaseNode {

  constructor() {
    super('BuildTarget');
  }

  public tick(tick: Tick): number {
    const creep = tick.target as Creep;
    const target = Game.getObjectById<ConstructionSite>(creep.memory.target);
    if (!target) {
      return b3.State.FAILURE;
    }

    if (creep.carry.energy && creep.carry.energy > 0) {
      const res = creep.build(target);
      if (res === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      } else if (res === OK) {
        return b3.State.RUNNING;
      }
    }

    return b3.State.SUCCESS;
  }
}
