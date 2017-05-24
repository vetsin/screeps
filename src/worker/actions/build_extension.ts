import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

const profiler = require('screeps-profiler');

export class BuildExtension extends BaseNode {
  name: string;

  constructor(id?: number) {
    super('BuildExtension'+id);
  }

  public tick(tick: Tick) : number {
    let creep = <Creep>tick.target;

    return b3.State.SUCCESS;
  }
}
