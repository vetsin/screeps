import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

const profiler = require('screeps-profiler');

export class FindTarget extends BaseNode {
  name: string;
  target_type: string

  constructor(targetType?: string) {
    super('FindTarget');
    this.target_type = targetType || STRUCTURE_SPAWN;
  }

  public tick(tick: Tick) : number {
    //console.log('FindTarget.tick')
    var creep = <Creep>tick.target;
    // just get the closest
    let target = creep.pos.findClosestByRange<Structure>(FIND_STRUCTURES, {
      filter: { structureType: this.target_type }
    });
    if(!target)
      return b3.State.FAILURE;
    creep.memory.target = target.id;

    return b3.State.SUCCESS;
  }
}
profiler.registerClass(FindTarget, 'FindTarget');
