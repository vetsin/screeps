import BaseNode from './../basenode';
import State from './../constants/state';

export default class Composite extends BaseNode {

  constructor(childs) {
    super();

    this.category = State.COMPOSITE;
    this.childs = [];
    childs.map(c => this.childs.push(c));
  }

}
