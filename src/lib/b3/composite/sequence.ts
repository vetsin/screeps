
import State from './../constants/state';
import BaseNode from './../basenode';
import Tick from './../tick';

export default class Sequence extends BaseNode implements IComposite {
  childs: BaseNode[];

  constructor(childs : BaseNode[]) {
    super('Sequence');

    this.childs = [];
    childs.map(c => this.childs.push(c));
  }

  public tick(tick : Tick) : number {
    for (var i = 0; i < this.childs.length; i += 1) {
      var status = this.childs[i].execute(tick);

      if (status !== State.SUCCESS) {
        return status;
      }
    }

    return State.SUCCESS;
  }
}
