import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import {RoomState} from './../../components/state';

export class WithdrawTarget extends BaseNode {
  resourceType: string;

  constructor(resourceType : string) {
    super('WithdrawTarget');
    this.resourceType = resourceType || RESOURCE_ENERGY;
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    let target = Game.getObjectById<Structure>(creep.memory.target);
    if(!target) {
      return b3.State.FAILURE;
    }

    let state = new RoomState(creep.room);
    if(_.sum(creep.carry) < creep.carryCapacity) {
      let res = creep.withdraw(target, this.resourceType);
      if(res == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      } else if (res == ERR_NOT_ENOUGH_RESOURCES) {
        // if we have ANY energy consider it a SUCCESS
        if(_.sum(creep.carry) > 0) {
          return b3.State.SUCCESS;
        }
        return b3.State.FAILURE;
      }
      return b3.State.RUNNING;
    }
    //state.unmark_energy(target.id, creep.carry.energy);
    delete creep.memory.target;
    return b3.State.SUCCESS;
  }
}
