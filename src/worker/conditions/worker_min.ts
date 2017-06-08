import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

import * as Utils from './../../components/utils'

export class WorkerMin extends BaseNode {
  private role: string;
  private count: number;

  constructor(role: string, count: number) {
    super('WorkerMin');
    this.role = role;
    this.count = count;
  }

  public tick(tick: Tick): number {
    const creep = tick.target as Creep;
    const role_count = Utils.get_role_count(creep.room, this.role);
    if (role_count >= this.count)
      return b3.State.SUCCESS;
    return b3.State.FAILURE;
  }
}
