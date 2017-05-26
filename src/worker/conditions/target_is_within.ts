import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class TargetIsWithin extends BaseNode {
  distance: number;

  constructor(distance: number) {
    super('TargetIsWithin');
    this.distance = distance;
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    let target = Game.getObjectById<Structure>(creep.memory.target);
    if(!target)
      return b3.State.FAILURE;
    if(creep.pos.inRangeTo(target, this.distance)) {
      return b3.State.SUCCESS
    }
    return b3.State.FAILURE;
  }
}
