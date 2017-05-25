
import State from './../constants/state';
import BaseNode from './../basenode';
import Tick from './../tick';

export default class MemSequence extends BaseNode implements IComposite {
  childs: BaseNode[];

  constructor(childs: BaseNode[]) {
    super('MemSequence');

    this.childs = [];
    childs.map(c => this.childs.push(c));
  }

  public open(tick: Tick) : void {
    tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
  }

  public tick(tick : Tick) : number {
    var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);

    for (var i = child; i < this.childs.length; i += 1) {
      var status = this.childs[i].execute(tick);

      if (status !== State.SUCCESS) {
        if (status === State.RUNNING) {
          tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
        }

        return status;
      }
    }

    return State.SUCCESS;
  }
}
