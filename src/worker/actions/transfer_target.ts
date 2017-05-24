import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

const profiler = require('screeps-profiler');

export class TransferTarget extends BaseNode {
  name: string;

  constructor() {
    super('TransferTarget');
  }

  public tick(tick: Tick) : number {

    let creep = <Creep>tick.target;
    if(!creep.memory.target)
      return b3.State.ERROR;
    //console.log('TransferTarget.tick ', creep.name)
    let target = <Creep | Structure> Game.getObjectById(creep.memory.target);
    // If we are targeting a spawn or extension, we need to be directly next to it - otherwise, we can be 3 away.


    if(creep.carry.energy && creep.carry.energy > 0) {
      let transfer_result : number = ERR_INVALID_TARGET;
      if(target instanceof Structure && target.structureType == STRUCTURE_CONTROLLER) {
        transfer_result = creep.upgradeController(<StructureController>target);
      } else {
        transfer_result = creep.transfer(target, RESOURCE_ENERGY);
      }

      if(transfer_result == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      } else if(transfer_result == ERR_FULL) {
        global.log.debug('Target FULL')
        delete creep.memory.target;
        return b3.State.FAILURE;
      }
      return b3.State.RUNNING
    }
    delete creep.memory.target;
    return b3.State.SUCCESS;
  }
}
profiler.registerClass(TransferTarget, 'TransferTarget');
