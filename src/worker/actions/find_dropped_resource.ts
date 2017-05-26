import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import {RoomState} from './../../components/state';

export class FindDroppedResource extends BaseNode {
  name: string;

  /*
  * Get Stored
  */
  constructor() {
    super('FindDroppedResource');
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

    //let state = new RoomState(creep.room);

    if(creep.carry.energy < creep.carryCapacity) {
      let actual_capacity = creep.carryCapacity - creep.carry.energy;
      let dropped = creep.room.find<Resource>(FIND_DROPPED_RESOURCES, { filter:
        (r : Resource) => {
          // loose guess on # of ticks it'll take to get there
          let distance = Math.sqrt(Math.pow(creep.pos.x - creep.pos.y, 2) + Math.pow(r.pos.x - r.pos.y, 2))
          let decay_guess = Math.ceil(r.amount/1000) * distance;
          let probable_pickup = r.amount - decay_guess;
          return probable_pickup > 0;// && state.get_earmarked_energy(r.id) > decay_guess;
        }
      });
      
      if(dropped.length == 0)
        return b3.State.FAILURE;
      let to_get = _.sample(dropped);

      //let earmarked = state.get_earmarked_energy(to_get.id);
      //if(dropped.amount > earmarked) {
        //let earmark_energy_count = to_get.amount > actual_capacity ? actual_capacity : to_get.amount;
        //state.earmark_energy(to_get.id, earmark_energy_count)
        creep.memory.target = to_get.id;
        return b3.State.SUCCESS
      //}
      // we failed...
      //return b3.State.FAILURE;
    }
    return b3.State.FAILURE;
  }
}
