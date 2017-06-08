import {Worker} from './../Worker';
import b3 from './../../lib/b3/';

import * as Actions from './../actions';
import * as Utils from './../../components/utils';

export class Upgrader extends Worker {

    /*
    * Pick up energy from Harvesters and upgrade controller
    */
    constructor() {
      super('upgrader');
    }

    public shouldSpawn(room: Room): boolean {
      // we don't need any of these till our controller level is high enough to warrent it
      const controllerArray = room.find(FIND_MY_STRUCTURES, { filter:
        (s: Structure) => s.structureType === STRUCTURE_CONTROLLER
      });
      if (controllerArray.length <= 0) {
        return false;
      }
      const controler = controllerArray[0] as StructureController;

      const upgraderCount = Utils.get_role_count(room, this.role);
      // we need conductors to function
      const conductorCount = Utils.get_role_count(room, 'conductor');
      return conductorCount > 0 && upgraderCount < controler.level / 2;
    }

    public defineCreep(room: Room): protoCreep {
      const spawn = Game.getObjectById(room.memory.spawn) as StructureSpawn;
      if (spawn) {
        return this.get_proto(spawn.energyCapacity);
      }
      return this.get_proto(300);
    }

    public setup(): any {
      return new b3.composite.Priority([
        new b3.composite.MemSequence([
          new Actions.FindTarget(STRUCTURE_CONTROLLER),
          new Actions.MoveToTarget(),
          new Actions.TransferTarget()
        ])
      ]);
    }

    private get_proto(energy: number): protoCreep {
      let body = [WORK, WORK, CARRY, MOVE];
      if (energy === 300) {
        body = [WORK, WORK, CARRY, MOVE];
      } else {
        body = [WORK, WORK, CARRY, MOVE];
      }
      return {
        body,
        name: this.get_name(),
        memory: {
          role: this.role
        }
      } as protoCreep;
    }

}
