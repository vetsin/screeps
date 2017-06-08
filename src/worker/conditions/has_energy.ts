import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class HasEnergy extends BaseNode {

  constructor() {
    super('HasEnergy');
  }

  public tick(tick: Tick): number {
    const creep = tick.target as Creep;
    if (_.sum(creep.carry) >= 0) {
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }
}
