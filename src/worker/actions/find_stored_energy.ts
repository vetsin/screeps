import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import {RoomState} from './../../components/state';

export class FindStoredEnergy extends BaseNode {
  name: string;

  /*
  * Get Stored
  */
  constructor() {
    super('FindStoredEnergy');
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    // Stay on target...
    if(creep.memory.target) {
      let tgt = Game.getObjectById(creep.memory.target);
      if(tgt instanceof Structure) {
        if (tgt.structureType == STRUCTURE_CONTAINER)
          return b3.State.SUCCESS;
      }
    }

    let state = new RoomState(creep.room);
    if(_.sum(creep.carry) < creep.carryCapacity) {
      let actual_capacity = creep.carryCapacity - _.sum(creep.carry);
      let container = creep.room.find<StructureContainer>(FIND_STRUCTURES, {
        filter: (s : Structure) =>{
          if (s.structureType == STRUCTURE_CONTAINER ) {
            let sc = s as StructureContainer;
            //console.log(sc.store[RESOURCE_ENERGY], ' ', state.get_earmarked_energy(s.id), ' ', sc.store[RESOURCE_ENERGY])
            return sc.store[RESOURCE_ENERGY] > 0;// &&
                    //state.get_earmarked_energy(s.id) < sc.store[RESOURCE_ENERGY];
          }
          return false;
        }
      });
      if(container.length == 0)
        return b3.State.FAILURE;
      //let earmarked = state.get_earmarked_energy(container.id);
      //if(container.store.energy > earmarked) {
        //let earmark_energy_count = container.store.energy > actual_capacity ? actual_capacity : container.store.energy;
        //state.earmark_energy(container.id, earmark_energy_count)
        creep.memory.target = _.sample(container).id;
        return b3.State.SUCCESS
      //}
      // we failed...
      //return b3.State.FAILURE;
    }
    return b3.State.FAILURE;
  }
}
