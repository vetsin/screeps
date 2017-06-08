import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class IsCreep extends BaseNode {

  /*
  * Is the target a creep?
   */
  constructor() {
    super("IsCreep");
  }

  public tick(tick: Tick): number {
    if (tick.target instanceof Creep) {
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }
}
