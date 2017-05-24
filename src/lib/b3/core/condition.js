import BaseNode from './../basenode';
import State from './../constants/state';

export default class Condition extends BaseNode {

  constructor(childs) {
    super();

    this.category = State.CONDITION;
    this.childs = [];
    childs.map(c => this.childs.push(c));
  }

}
