import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class SetupWorker extends BaseNode {
  private role: string;

  constructor(role: string) {
    super("SetupWorker");
    this.role = role;
  }

  public tick(tick: Tick): number {
    const creep = tick.target as Creep;
    if (!creep.spawning && creep.memory.role === this.role) {
      //tick.target =
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }
}
