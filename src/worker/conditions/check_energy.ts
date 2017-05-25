import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class CheckTargetEnergy extends BaseNode {

  constructor() {
    super('CheckEnergy');
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;
    //console.log(creep.name, 'check energy', creep.memory.target)
    if(creep.memory.target) {
      let target = Game.getObjectById<Structure>(creep.memory.target);
      if(target) {
        if(target.structureType == STRUCTURE_SPAWN) {
          let tgt = target as StructureSpawn;
          if(tgt.energy < tgt.energyCapacity)
            return b3.State.SUCCESS;
        }
      }
    }
    return b3.State.FAILURE;
  }
}
