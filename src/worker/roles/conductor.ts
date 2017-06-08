import {Worker} from './../Worker';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Conditions from './../conditions';
import * as Utils from './../../components/utils';
const Composite = b3.composite;

// const profiler = require('screeps-profiler');

export class Conductor extends Worker {
  /*
   * Move energy around
   */
  constructor() {
    super('conductor');
  }

  public shouldSpawn(room: Room): boolean {
    // we don't need conductors if we don't have any built containers...
    const containers = room.find<Structure>(FIND_STRUCTURES, {
      filter: (s: Structure) => s.structureType === STRUCTURE_CONTAINER
    }).length;
    if (containers <= 0) {
      return false;
    }
    const harvesterCount = Utils.get_role_count(room, 'harvester');
    const conductorCount = Utils.get_role_count(room, this.role);
    // number of conductors should be dependent at our controller level (e.g. how much Work a harvester has)
    const controllerArray = room.find(FIND_MY_STRUCTURES, {
      filter: (s: Structure) => s.structureType === STRUCTURE_CONTROLLER
    });
    if (controllerArray.length <= 0) {
      return false;
    }
    const controller = controllerArray[0] as StructureController;
    const multiplier = Math.ceil(controller.level / 2);
    return (conductorCount < harvesterCount * multiplier);
  }

  public defineCreep(room: Room): protoCreep {
    const spawn = Game.getObjectById(room.memory.spawn) as StructureSpawn;
    if (spawn) {
      return this.get_proto(spawn.energyCapacity);
    }
    return this.get_proto(300);
  }

  public setup(): any {
    return new Composite.MemPriority([
      new Composite.MemSequence([
        // get energy
        new Composite.MemPriority([
          // if we're full do nothing
          new Conditions.AlreadyFull(),
          // else try to find stored energy
          new Composite.MemSequence([
            new Actions.FindStoredEnergy(),
            new Actions.WithdrawTarget(RESOURCE_ENERGY),
          ]),
          // else find dropped energy
          new Composite.MemSequence([
            new Actions.FindDroppedResource(),
            new Actions.PickupTarget()
          ]),
          // if we found no resource and have energy just do something with it.
          new Conditions.HasEnergy()
        ]),
        // put it somewhere
        new Composite.MemPriority([
          // prioritize spawn, we want creeps first.
          new Composite.MemSequence([
            new Actions.FindTarget(STRUCTURE_SPAWN),
            new Conditions.CheckTargetEnergy(),
            new Actions.TransferTarget()
          ]),
          new Composite.MemSequence([
            new Composite.SuccessLoop([
              new Actions.FindRole('builder'),
              new Conditions.HasEnergy(),
              new Actions.TransferTarget()
            ])
          ]),
          new Composite.MemSequence([
            new Composite.SuccessLoop([
              new Actions.FindRole('upgrader'),
              new Conditions.HasEnergy(),
              new Actions.TransferTarget()
            ])
          ])
        ])
      ])
    ]);
  }

  private get_proto(energy: number): protoCreep {
    return {
      body: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      name: this.get_name(),
      memory: {
        role: this.role
      }
    } as protoCreep;
  }
}
// profiler.registerClass(Conductor, 'Conductor');
