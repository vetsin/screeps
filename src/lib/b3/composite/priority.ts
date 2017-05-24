
import State from './../constants/state';
import BaseNode from './../basenode';
import Tick from './../tick';

export default class Priority extends BaseNode implements IComposite {
  childs: BaseNode[];

  constructor(childs : BaseNode[], id?: number) {
    super('Priority', id);

    this.childs = [];
    childs.map(c => this.childs.push(c));
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
