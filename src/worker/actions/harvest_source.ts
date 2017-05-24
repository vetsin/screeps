import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

const profiler = require('screeps-profiler');

export class HarvestSource extends BaseNode {
  name: string;

  constructor(id?: number) {
    super('HarvestSource', id);
  }

  public tick(tick: Tick) : number {
    let creep = <Creep>tick.target;
    //console.log('HarvestSource.tick', creep.name);
    let en = creep.carry.energy || 0;
    let source = Game.getObjectById<Source | Mineral>(creep.memory.source);
    if(!source)
      return b3.State.FAILURE;

    if(en < creep.carryCapacity) {
      if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
      return b3.State.RUNNING;
    }

    delete creep.memory.source; // we don't need to know this anymore
    return b3.State.SUCCESS;
  }
}
profiler.registerClass(HarvestSource, 'HarvestSource');
