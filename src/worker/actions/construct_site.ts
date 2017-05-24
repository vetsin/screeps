import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

const profiler = require('screeps-profiler');

export class ConstructSite extends BaseNode {
  name: string;

  constructor(id?: number) {
    super('ConstructSite'+id);
    // requires WORK, CARRY
  }

  public tick(tick: Tick) : number {
    let creep = <Creep>tick.target;
    //creep.build(target)
    return b3.State.SUCCESS;
  }
}
