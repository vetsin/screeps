import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';


export class UpgradeTarget extends BaseNode {

  constructor() {
    super('UpgradeTarget');
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    let target = Game.getObjectById<StructureController>(creep.memory.target);
    if(!target)
      return b3.State.FAILURE;

    if(creep.carry.energy && creep.carry.energy > 0) {
      if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return b3.State.RUNNING;
    }
    return b3.State.SUCCESS;
  }
}
