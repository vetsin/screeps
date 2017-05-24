import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import {RoomState} from './../../components/state';

export class PickupTarget extends BaseNode {

  constructor() {
    super('PickupTarget');
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    let target = Game.getObjectById<Resource>(creep.memory.target);
    if(!target)
      return b3.State.FAILURE;

    let state = new RoomState(creep.room);
    if(target.amount > 0 && creep.carry.energy != undefined && creep.carry.energy < creep.carryCapacity) {
      console.log(creep.name, 'pickup', target.id)
      if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return b3.State.RUNNING;
    }
    state.unmark_energy(target.id, creep.carry.energy || 0);
    delete creep.memory.target;
    return b3.State.SUCCESS;
  }
}
