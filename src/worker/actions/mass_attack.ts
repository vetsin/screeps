import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';


export class MassAttack extends BaseNode {

  constructor() {
    super('MassAttack');
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;

    var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    if(targets.length >= 2) {
      creep.rangedMassAttack();
    }

    return b3.State.SUCCESS;
  }
}
