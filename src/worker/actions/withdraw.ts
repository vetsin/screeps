import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import {RoomState} from './../../components/state';

export class WithdrawTarget extends BaseNode {
  resourceType: string;

  constructor(resourceType : string, id?: number) {
    super('WithdrawTarget', id);
    this.resourceType = resourceType || RESOURCE_ENERGY;
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    let target = Game.getObjectById<Structure>(creep.memory.target);
    if(!target)
      return b3.State.FAILURE;

    let state = new RoomState(creep.room);
    if(creep.carry.energy && creep.carry.energy < creep.carryCapacity) {
      console.log('withdrawing from ', target.id)
      if(creep.withdraw(target, this.resourceType) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return b3.State.RUNNING;
    }
    state.unmark_energy(target.id, creep.carry.energy);
    delete creep.memory.target;
    return b3.State.SUCCESS;
  }
}
