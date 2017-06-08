
import State from './../constants/state';
import BaseNode from './../basenode';
import Tick from './../tick';

export default class Priority extends BaseNode implements IComposite {
  childs: BaseNode[];

  constructor(childs : BaseNode[]) {
    super('Priority');

    this.childs = [];
    childs.map(c => this.childs.push(c));
  }

  public enter(tick: Tick): void {
    const depth = tick.blackboard.get("depth", tick.tree.id) || 0;
    tick.blackboard.set("depth", depth + 1, tick.tree.id);
  }

  public exit(tick: Tick): void {
    const depth = tick.blackboard.get("depth", tick.tree.id) || 0;
    tick.blackboard.set("depth", depth - 1, tick.tree.id);
  }

  public tick(tick : Tick) : number {
    for (var i = 0; i < this.childs.length; i += 1) {
      var status = this.childs[i].execute(tick);

      if (status !== State.FAILURE) {
        return status;
      }
    }

    return State.FAILURE;
  }
}
