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
    console.log('FindFlag.tick ', this.flag_name)
    var creep = <Creep>tick.target;
    // just get the closest
    let target = creep.room.find<Flag>(FIND_FLAGS, {
      filter: (f:Flag) => { return f.name == this.flag_name }
    });
    if(target.length == 0)
      return b3.State.FAILURE;
    console.log('found flag')
    if(!creep.pos.isNearTo(target[0].pos)) {
      creep.moveTo(target[0].pos);
      return b3.State.RUNNING;
    }
    return b3.State.SUCCESS;
  }
}
