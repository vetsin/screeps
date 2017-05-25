import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class DepositEnergy extends BaseNode {
  name: string;

  constructor() {
    super('Deposit');
  }

  public tick(tick: Tick) : number {
    //console.log('FindTarget.tick')
    var creep = <Creep>tick.target;
    let target = Game.getObjectById<Structure>(creep.memory.target);
    if(!target)
      return b3.State.FAILURE;
    if(creep.carry.energy && creep.carry.energy > 0) {
      if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return b3.State.RUNNING;
    }
    delete creep.memory.target;
    return b3.State.SUCCESS;


    /*
    if(creep.carry.energy && creep.carry.energy > 0)
      return b3.State.RUNNING;
    return b3.State.SUCCESS;
    if(target.structureType == STRUCTURE_CONTROLLER ||
        target.structureType == STRUCTURE_STORAGE ||
        target.structureType == STRUCTURE_TERMINAL) {
        let tgt = target as StructureContainer | StructureStorage | StructureTerminal;
        if(_.sum(tgt.store) < tgt.storeCapacity)
          return b3.State.RUNNING;
    } else if (target.structureType == STRUCTURE_LINK) {
      let tgt = target as StructureLink;
      if(tgt.energy < tgt.energyCapacity)
        return b3.State.RUNNING;
    }
    */

  }
}
