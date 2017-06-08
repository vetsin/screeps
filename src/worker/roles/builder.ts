import {Worker} from './../Worker';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Conditions from './../conditions';
import * as Utils from './../../components/utils';
const Composite = b3.composite;

// const profiler = require('screeps-profiler');

export class Builder extends Worker {

  /*
  * Build stuff else upgrade when not busy
  */
  constructor() {
    super('builder');
  }

  public shouldSpawn(room: Room): boolean {
    const upgraderCount = Utils.get_role_count(room, this.role);
    if (upgraderCount < 2) {
      return true;
    }
    return false;
  }

  public defineCreep(room: Room): protoCreep {
    const spawn = Game.getObjectById(room.memory.spawn) as StructureSpawn;
    if (spawn) {
      return this.get_proto(spawn.energyCapacity);
    }
    return this.get_proto(300);
  }

  public setup(): any {
    const mineEnergy = new b3.decorator.Continue(new Composite.Sequence([
      new b3.decorator.Inverter(new Conditions.AlreadyFull()),
      new Conditions.WorkerEquals('conductor', 0),
      new Actions.FindSource(false),
      new Actions.HarvestSource()
    ]));

    return new Composite.MemSequence([
      // but if we have no energy, and have nothing to get it from, harvest some.
      mineEnergy,
      /// else build something
      new Composite.MemPriority([
        this.build_target(STRUCTURE_CONTAINER),
        this.build_target(STRUCTURE_EXTENSION),
        this.build_target(STRUCTURE_CONTROLLER),
        new Composite.MemSequence([
          new Actions.FindTarget(STRUCTURE_CONTROLLER),
          new Actions.MoveToTarget(),
          new Actions.TransferTarget()
        ])
      ])
    ]);
  }

  private get_proto(energy: number): protoCreep {
    return {
      body: [WORK, WORK, CARRY, MOVE],
      name: this.get_name(),
      memory: {
        role: this.role
      }
    } as protoCreep;
  }

  private build_target(type: string): any {
    // If we don't have conductors yet, we should mine our resources to help.
    return new b3.composite.MemSequence([
      new Actions.FindConstructionSite(type),
      new Actions.MoveToTarget(),
      new Actions.BuildTarget()
    ]);
  }
}
