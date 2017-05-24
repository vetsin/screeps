import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import {RoomState} from './../../components/state';

export class GetEnergy extends BaseNode {
  name: string;

  constructor() {
    super('GetEnergy');
  }

  public tick(tick: Tick) : number {
    //console.log('GetEnergy.tick')
    var creep = <Creep>tick.target;
    // Stay On target
    if(creep.memory.target)
      return b3.State.SUCCESS;
    if(creep.carry.energy == undefined)
      return b3.State.FAILURE;

    let state = new RoomState(creep.room);
    
    if(creep.carry.energy < creep.carryCapacity) {
      //console.log('look for dropped...')
      // first find loose energy
      var dropped = creep.pos.findClosestByRange<Resource>(FIND_DROPPED_RESOURCES)
      //console.log('dropped ', dropped)
      if(dropped) {
        if (creep.pickup(dropped) === ERR_NOT_IN_RANGE) {
          creep.moveTo(dropped);
        }
        return b3.State.RUNNING
      }

      // else usage storage
      let storage = creep.pos.findClosestByRange<StructureStorage>(FIND_STRUCTURES, {
        filter: { structureType: STRUCTURE_STORAGE }
      });
      if(storage) {
        if(creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(storage);
        }
        return b3.State.RUNNING
      }
      // we failed...
      return b3.State.FAILURE;
    }

    return b3.State.SUCCESS;
  }
}
