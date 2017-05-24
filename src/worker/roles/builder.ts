//import {createUUID} from './../../lib/b3/utils';
import {Worker} from './../Worker';
import {Hive} from './../../Hive';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';

const profiler = require('screeps-profiler');

export class Builder extends Worker {

  /*
  * Build stuff else upgrade when not busy
  */
  constructor(creepName: string) {
    super(creepName, 'builder');
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
    let upgraders = hive.get_workers('builder');
    if(upgraders.length == 0) {
      return this.get_proto(300);
    } else {
      // for now at least 2 builders
      if(upgraders.length < 2)
        return this.get_proto(300);
    }
  }

  setup() : any {
    return new b3.composite.Priority([
      new b3.composite.MemSequence([
        new Actions.FindConstructionSite(STRUCTURE_CONTAINER),
        new Actions.BuildTarget()
      ])/*,
      new b3.composite.MemSequence([
        new Actions.FindConstructionSite(STRUCTURE_SPAWN),
        new Actions.BuildTarget()
      ]),
      // else we should just upgrade...
      new b3.composite.MemSequence([
        new Actions.FindTarget(STRUCTURE_CONTROLLER),
        new Actions.TransferTarget()
      ])*/
    ])
  }
}
