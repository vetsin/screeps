import {createUUID} from './../../lib/b3/utils';
import {Worker} from './../Worker';
import {Hive} from './../../Hive';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Conditions from './../conditions';
import * as Utils from './../../components/utils';

const profiler = require('screeps-profiler');

export class Conductor extends Worker {
    /*
    * Move energy around
    */
    constructor(creepName: string) {
      super(creepName, 'conductor');
    }

    private get_proto(energy: number) : protoCreep {
      return <protoCreep>  {
        body: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        name: this.get_name(),
        memory: {
          role: this.role
        }
      };
    }

    public create(hive: Hive) : protoCreep | undefined {
      let harvester_count = Utils.get_role_count(hive.room, 'harvester');
      let conductor_count = Utils.get_role_count(hive.room, this.role);
      if(conductor_count == 0) {
        return this.get_proto(300);
      } else {
        if(harvester_count == 0)
          return undefined;

        if (conductor_count < harvester_count * 2)
          return this.get_proto(300);
      }
    }

    public setup() : any {
      return new b3.composite.MemPriority([
        new b3.composite.MemSequence([
          // get energy
          new b3.composite.MemPriority([
            // if we're full do nothing
            new Conditions.AlreadyFull(),
            // else try to find stored energy
            new b3.composite.MemSequence([
              new Actions.FindStoredEnergy(),
              new Actions.WithdrawTarget(RESOURCE_ENERGY),
            ]),
            // else find dropped energy
            new b3.composite.MemSequence([
              new Actions.FindDroppedResource(),
              new Actions.PickupTarget()
            ]),
            // if we found no resource and have energy just do something with it.
            new Conditions.HasEnergy()
          ]),
          // put it somewhere
          new b3.composite.MemPriority([
            // prioritize spawn, we want creeps first.
            new b3.composite.MemSequence([
              new Actions.FindTarget(STRUCTURE_SPAWN),
              new Conditions.CheckTargetEnergy(),
              new Actions.TransferTarget()
            ]),
            new b3.composite.MemSequence([
              new Actions.FindRole('builder'),
              new Actions.TransferTarget()
            ]),
            new b3.composite.MemSequence([
              new Actions.FindRole('upgrader'),
              new Actions.TransferTarget()
            ])
          ])
        ]),
        // Assume we have nothing to do, and go to spawn
        new b3.composite.MemSequence([
          new Actions.FindFlag('Hangout'),
          new Actions.MoveToTarget()
        ]),
      ])
    }
}
profiler.registerClass(Conductor, 'Conductor');
