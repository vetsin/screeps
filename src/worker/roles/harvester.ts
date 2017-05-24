import {createUUID} from './../../lib/b3/utils';
import {Worker} from './../Worker';
import {Hive} from './../../Hive';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Conditions from './../conditions';

const profiler = require('screeps-profiler');

export class Harvester extends Worker {
    /*
    * Sit next to a source and just mine the crap out of it
    * Put everything into a container and repair that container
    */
    constructor(creepName: string) {
      super(creepName, 'harvester');
    }

    private get_proto(energy: number) : protoCreep {
      return <protoCreep>  {
        body: [WORK, WORK, CARRY, MOVE],
        name: this.get_name(),
        memory: {
          role: this.role,
          tree: createUUID()
        }
      };
    }

    public create(hive: Hive) : protoCreep | undefined {
      let harvesters = hive.get_workers('harvester');
      if(harvesters.length == 0) {
        // spawn at least one
        return this.get_proto(300); // HACK
      } else {
        // find appropriate number of harvesters per source that doesn't have a keeper
        for(let source in hive.room.memory.sources) {
          let source_mem = <SourceData>hive.room.memory.sources[source];
          // we need to know how many are assgined already to this source
          let active_count = hive.creeps.filter((creep: Creep) => {
            return creep.memory.assigned_source == source
          }).length;
          //if(active_count < source_mem.harvester_count) {

          if(active_count < 1 && source_mem.has_keeper == false) {
            return this.get_proto(300); // HACK
          }
        }
      }
    }

    public setup() : any {
      return new b3.composite.Priority([
        new b3.composite.MemSequence([
          new Actions.FindSource(1),
          new Actions.HarvestSource(1),
          new b3.composite.MemPriority([
            // either deposit it
            new b3.composite.MemSequence([
              new Actions.FindTarget(STRUCTURE_CONTAINER, 1),
              new Actions.RepairTarget(1),
              new Actions.TransferTarget(1)
            ], 3),
            new b3.composite.MemPriority([
              // transfer it
              new b3.composite.MemSequence([
                new Conditions.WorkerEquals('conductor', 0),
                new Actions.FindTarget(STRUCTURE_SPAWN, 2),
                new Conditions.CheckTargetEnergy(1),
                new Actions.TransferTarget(2)
              ], 5),
              // or drop it
              new b3.composite.Sequence([
                new Actions.DropResource(RESOURCE_ENERGY, 1)
              ], 6)
            ], 4)
          ], 2)

        ], 1)
      ], 0)
    }
}
profiler.registerClass(Harvester, 'Harvester');
