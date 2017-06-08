
import State from '../constants/state';
import BaseNode from './../basenode';

export default class Continue extends BaseNode {
  private child: BaseNode;

  constructor(child: BaseNode) {
    super('Continue');
    this.child = child;

    if (!child) {
      console.warn('[behavior3] a decorator was initialized without child (',
        this.id, ')');
    }
  }

  tick(tick) {
    if (!this.child) {
      return State.SUCCESS;
    }

    const status = this.child.execute(tick);

    if (status !== State.RUNNING) {
      return State.SUCCESS;
    }
    return status;
  }
}
