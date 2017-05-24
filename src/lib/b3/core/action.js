import BaseNode from './../basenode';
import State from './../constants/state';

export default class Action extends BaseNode {

  constructor(childs) {
    super();

    this.category = State.ACTION;
    this.childs = [];
    childs.map(c => this.childs.push(c));
  }

}
