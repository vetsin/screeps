import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

import * as Utils from './../../components/utils'

export class WorkerMin extends BaseNode {
  role: string;
  count: number;

  constructor(role: string, count: number) {
    super('WorkerMin');
    this.role = role;
    this.count = count;
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    let role_count = Utils.get_role_count(creep.room, this.role);
    if(role_count >= this.count)
      return b3.State.SUCCESS;
    return b3.State.FAILURE;
  }
}
