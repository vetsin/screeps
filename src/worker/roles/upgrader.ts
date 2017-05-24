//import {createUUID} from './../../lib/b3/utils';
import {Worker} from './../Worker';
import {Hive} from './../../Hive';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';

const profiler = require('screeps-profiler');

export class Upgrader extends Worker {

    /*
    * Pick up energy from Harvesters and upgrade controller
    */
    constructor(creepName: string) {
      super(creepName, 'upgrader');
    }

    private get_proto(energy: number) : protoCreep {
      return <protoCreep>  {
        body: [WORK, WORK, CARRY, MOVE],
        name: this.get_name(),
        memory: {
          role: this.role
        }
      };
    }

    public create(hive: Hive) : protoCreep | undefined {
      let upgraders = hive.get_workers(this.role);
      if(upgraders.length == 0) {
        return this.get_proto(300);
      } else {
        // for now just have 1 upgraders, allow builders to fill the role otherwise
        if(upgraders.length < 1)
          return this.get_proto(300);
      }
    }

    setup() : any {
      return new b3.composite.Priority([
        new b3.composite.MemSequence([
          new Actions.FindTarget(STRUCTURE_CONTROLLER),
          new Actions.MoveToTarget(),
          new Actions.TransferTarget()
        ])
      ])
    }
}
