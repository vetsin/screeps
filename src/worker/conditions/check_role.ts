import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class CheckRole extends BaseNode {
  private role: string;

  constructor(role: string) {
    super("CheckRole");
    this.role = role.toLowerCase();
  }

  public tick(tick: Tick): number {
    const creep = tick.target as Creep;
    if (creep && !creep.spawning && creep.memory.role === this.role) {
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }
}
