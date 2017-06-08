import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class AlreadyFull extends BaseNode {

  constructor() {
    super('AlreadyFull');
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    if (_.sum(creep.carry) >= creep.carryCapacity) {
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }
}
