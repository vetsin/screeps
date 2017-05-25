//import {createUUID} from './../../lib/b3/utils';
import {Worker} from './../Worker';
import {Hive} from './../../Hive';
import b3 from './../../lib/b3/';

import * as Actions from './../actions';
import * as Utils from './../../components/utils';

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
      let upgrader_count = Utils.get_role_count(hive.room, this.role);
      if(upgrader_count == 0) {
        return this.get_proto(300);
      } else {
        // for now just have n upgraders, allow builders to fill the role otherwise
        if(upgrader_count < 2)
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
