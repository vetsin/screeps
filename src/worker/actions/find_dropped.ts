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
    super('FindStoredEnergy', id);
  }

  public tick(tick: Tick) : number {
    //console.log('GetEnergy.tick')
    var creep = <Creep>tick.target;
    // Stay on target...
    if(creep.memory.target)
      return b3.State.SUCCESS;
    if(creep.carry.energy == undefined)
      return b3.State.FAILURE;

    let state = new RoomState(creep.room);

    if(creep.carry.energy < creep.carryCapacity) {
      let actual_capacity = creep.carryCapacity - creep.carry.energy;
      let container = creep.pos.findClosestByRange<StructureContainer>(FIND_STRUCTURES, {
        filter: (s : Structure) =>{
          if (s != undefined && s.structureType == STRUCTURE_CONTAINER ) {
            let sc = s as StructureContainer;
            return sc.store[RESOURCE_ENERGY] > 0 &&
                    state.get_earmarked_energy(s.id) < sc.store[RESOURCE_ENERGY];
          }
          return false;
        }
      });
      if(container) {
        let earmark_energy_count = container.store[RESOURCE_ENERGY] > actual_capacity ? actual_capacity : container.store[RESOURCE_ENERGY];
        state.earmark_energy(container.id, earmark_energy_count)
        creep.memory.target = container.id;
        return b3.State.SUCCESS
      }
      // we failed...
      return b3.State.FAILURE;
    }
    return b3.State.SUCCESS;
  }
}
