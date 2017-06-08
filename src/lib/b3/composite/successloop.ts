
import State from '../constants/state';
import BaseNode from '../basenode';
import Tick from '../tick';

export default class SuccessLoop extends BaseNode implements IComposite {
  childs: BaseNode[];
  private limit: number;

  /*
  * Loop as long as we have a success till we hit the limit
   */
  constructor(childs: BaseNode[], limit?: number) {
    super('Loop');
    this.limit = limit || 50;

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
    tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    tick.blackboard.set('loop', 0, tick.tree.id, this.id);
  }

  public tick(tick: Tick): number {

    const loop = tick.blackboard.get('loop', tick.tree.id, this.id);
    console.log('loop', loop, 'loops', this.limit)
    for (let j = loop ; j < this.limit; j += 1) {
      const child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
      console.log('looping', child);
      for (let i = child; i < this.childs.length; i += 1) {
        const status = this.childs[i].execute(tick);

        if (status !== State.SUCCESS) {
          if (status === State.RUNNING) {
            tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
          }
          return status;
        }
      }
      console.log('restarting loop')
      tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
      // don't forget to incriment
      tick.blackboard.set('loop', j, tick.tree.id, this.id);
    }

    return State.SUCCESS;
  }
}
