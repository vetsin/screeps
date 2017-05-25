import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class FindFlag extends BaseNode {
  flag_name: string

  constructor(flag_name: string) {
    super('FindFlag');
    this.flag_name = flag_name;
  }

  public tick(tick: Tick) : number {
    //console.log('FindTarget.tick ', this.target_type)
    var creep = <Creep>tick.target;
    // just get the closest
    let target = creep.room.find<Flag>(FIND_FLAGS, {
      filter: (s:Flag) => { return s.name == this.flag_name }
    });
    if(!target)
      return b3.State.FAILURE;
    creep.memory.target = target[0].pos;

    return b3.State.SUCCESS;
  }
}
