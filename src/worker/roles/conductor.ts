import {createUUID} from './../../lib/b3/utils';
import {Worker} from './../Worker';
import {Hive} from './../../Hive';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Conditions from './../conditions';

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
      let harvesters = hive.get_workers('harvester');
      let conductors = hive.get_workers('conductor');
      if(conductors.length == 0) {
        return this.get_proto(300);
      } else {
        if(harvesters.length == 0)
          return undefined;

        if (conductors.length < harvesters.length * 3)
          return this.get_proto(300);
      }
    }

    public setup() : any {
      return new b3.composite.Priority([
        new b3.composite.MemSequence([
          new Actions.GetEnergy(),
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

        ])
      ])
    }
}
profiler.registerClass(Conductor, 'Conductor');
