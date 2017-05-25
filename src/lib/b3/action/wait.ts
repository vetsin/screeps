import State from './../constants/state';
import BaseNode from './../basenode';
import Tick from './../tick';

export default class Wait extends BaseNode {
  endTime: number;

  constructor(ms : number) {
    super('Wait');

    this.endTime = ms || 0;
  }

  public open(tick: Tick) : void {
    var startTime = (new Date()).getTime();
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
  }

  public tick(tick: Tick) : number {
    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

    if (currTime - startTime >= this.endTime) {
      return State.SUCCESS;
    }

    return State.RUNNING;
  }
}
