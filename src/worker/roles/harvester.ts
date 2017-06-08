import {Worker} from './../Worker';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Conditions from './../conditions';
import * as Utils from './../../components/utils';
const Composite = b3.composite;

export class Harvester extends Worker {
    /*
    * Sit next to a source and just mine the crap out of it
    * Put everything into a container and repair that container
    */
    constructor() {
      super('harvester');
    }

    public shouldSpawn(room: Room): boolean {
      const harvesterCount = Utils.get_role_count(room, this.role);
      if (harvesterCount === 0) {
        return true;
      } else {
        // find appropriate number of harvesters per source that doesn't have a keeper
        for (const source in room.memory.sources) {
          const sourceMem = room.memory.sources[source] as SourceData;
          // TODO: refactor to lessen our loops
          const activeCount = _.filter(Game.creeps, (creep: Creep) => {
            return creep.room === room && creep.memory.assigned_source === source;
          }).length;

          if (activeCount < 1 && sourceMem.has_keeper === false) {
            return true;
          }
        }
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
      return new Composite.MemSequence([
          new Actions.FindSource(),
          new Actions.HarvestSource(),
          new Composite.MemPriority([
            // either deposit it
            new Composite.MemPriority([
              new Composite.MemSequence([
                new Actions.FindTarget(STRUCTURE_CONTAINER),
                new Conditions.TargetIsWithin(3),
                new Actions.RepairTarget(),
                new Actions.TransferTarget()
              ]),
              // build it
              new Composite.MemSequence([
                new Actions.FindConstructionSite(STRUCTURE_CONTAINER, 4),
                new Actions.BuildTarget()
              ]),
              // construct it
              new Composite.MemSequence([
                new Actions.FindSource(),
                new Actions.ConstructContainer()
              ])
            ])
          ])
        ]);
    }

    private get_proto(energy: number): protoCreep {
      let body = [WORK, WORK, CARRY, MOVE];
      if (energy === 666) {
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
