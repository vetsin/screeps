import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import {RoomState} from './../../components/state';

const profiler = require('screeps-profiler');

export class TransferTarget extends BaseNode {
  constructor() {
    super('TransferTarget');
  }

  public tick(tick: Tick): number {

    const creep = tick.target as Creep;
    if (!creep.memory.target) {
      return b3.State.ERROR;
    }
    // console.log('TransferTarget.tick ', creep.name)
    const target = Game.getObjectById(creep.memory.target) as Creep | Structure;
    // If we are targeting a spawn or extension, we need to be directly next to it - otherwise, we can be 3 away.
    if (_.sum(creep.carry) > 0) {
      let transferResult: number = ERR_INVALID_TARGET;
      if (target instanceof Structure && target.structureType === STRUCTURE_CONTROLLER) {
        transferResult = creep.upgradeController(target as StructureController);
      } else {
        transferResult = creep.transfer(target, RESOURCE_ENERGY);
      }
      if (transferResult === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
        return b3.State.RUNNING;
      }
    }
    delete creep.memory.target;
    return b3.State.SUCCESS;
  }
}
profiler.registerClass(TransferTarget, 'TransferTarget');
