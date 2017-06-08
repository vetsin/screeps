import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class IsEnemyInRoom extends BaseNode {

  constructor() {
    super('IsEnemyInRoom');
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    var hostileCreeps =creep.room.find(FIND_HOSTILE_CREEPS, {
      filter: (enemy: Creep) => { return !enemy.my }
    });
    if(hostileCreeps.length > 0)
      return b3.State.SUCCESS;
    return b3.State.FAILURE;
  }
}
