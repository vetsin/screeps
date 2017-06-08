import {Worker} from './../Worker';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Conditions from './../conditions';
import * as Utils from './../../components/utils';

export class Healer extends Worker {
  /*
   * Move energy around
   */
  constructor() {
    super('healer');
  }

  public shouldSpawn(room: Room): boolean {
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
    return new b3.composite.MemPriority([
      new b3.composite.MemSequence([
        new Actions.FindFlag('Hangout'),
        new Actions.MoveToTarget()
      ]),
    ]);
  }

  private get_proto(energy: number): protoCreep {
    return {
      body: [MOVE, HEAL],
      name: this.get_name(),
      memory: {
        role: this.role
      }
    } as protoCreep;
  }
}
