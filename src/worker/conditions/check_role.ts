import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class CheckRole extends BaseNode {
  role: string;

  constructor(role: string) {
    super('CheckRole');
    this.role = role;
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    //console.log(creep.memory.role, this.role, creep.memory.role == this.role)
    if(creep.memory.role == this.role)
      return b3.State.SUCCESS
    return b3.State.FAILURE;
  }
}
