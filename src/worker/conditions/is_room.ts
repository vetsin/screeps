import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class IsRoom extends BaseNode {

  constructor() {
    super("IsRoom");
  }

  public tick(tick: Tick): number {
    if (tick.target instanceof Room) {
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }

}
