import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import {RoomState} from './../../components/state';

export class FindDroppedResource extends BaseNode {
  name: string;

  /*
  * Get Stored
  */
  constructor(id?: number) {
    super('FindDroppedResource', id);
  }

  public tick(tick: Tick) : number {
    //console.log('FindDroppedResource.tick')
    var creep = <Creep>tick.target;
    // Stay on target...
    if(creep.memory.target) {
      let obj = Game.getObjectById(creep.memory.target);
      if(obj && obj instanceof Resource && (obj as Resource).amount > 0) {
        return b3.State.SUCCESS;
      }
    }

    if(creep.carry.energy == undefined)
      return b3.State.FAILURE;

    let state = new RoomState(creep.room);

    if(creep.carry.energy < creep.carryCapacity) {
      let actual_capacity = creep.carryCapacity - creep.carry.energy;
      var dropped = creep.pos.findClosestByRange<Resource>(FIND_DROPPED_RESOURCES)

      if(dropped) {
        let earmark_energy_count = dropped.amount > actual_capacity ? actual_capacity : dropped.amount;
        state.earmark_energy(dropped.id, earmark_energy_count)
        creep.memory.target = dropped.id;
        return b3.State.SUCCESS
      }
      // we failed...
      return b3.State.FAILURE;
    }
    return b3.State.FAILURE;
  }
}
