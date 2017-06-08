
import State from './../constants/state';
import BaseNode from './../basenode';
import Tick from './../tick';

export default class MemPriority extends BaseNode implements IComposite {
  childs: BaseNode[];

  constructor(childs: BaseNode[]) {
    super("MemPriority");

    this.childs = [];
    childs.map((c) => this.childs.push(c));
  }

  public enter(tick: Tick): void {
    const depth = tick.blackboard.get("depth", tick.tree.id) || 0;
    tick.blackboard.set("depth", depth + 1, tick.tree.id);
  }

  public exit(tick: Tick): void {
    const depth = tick.blackboard.get("depth", tick.tree.id) || 0;
    tick.blackboard.set("depth", depth - 1, tick.tree.id);
  }

  public open(tick: Tick): void {
    tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
  }

  public tick(tick: Tick): number {
    const child = tick.blackboard.get("runningChild", tick.tree.id, this.id);

    for (let i = child; i < this.childs.length; i += 1) {
      const status = this.childs[i].execute(tick);

      if (status !== State.FAILURE) {
        if (status === State.RUNNING) {
          tick.blackboard.set("runningChild", i, tick.tree.id, this.id);
        }

        return status;
      }
    }

    return State.FAILURE;
  }
}
