import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';


export class MoveToTarget extends BaseNode {

  constructor(id?: number) {
    super('MoveToTarget', id);
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    let target = Game.getObjectById<RoomPosition>(creep.memory.target);
    if(!target)
      return b3.State.FAILURE;

    if(!creep.pos.isNearTo(target)) {
      creep.moveTo(target);
      return b3.State.RUNNING;
    }

    return b3.State.SUCCESS;
  }
}
