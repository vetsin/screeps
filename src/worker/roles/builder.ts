//import {createUUID} from './../../lib/b3/utils';
import {Worker} from './../Worker';
import {Hive} from './../../Hive';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Utils from './../../components/utils';

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
    let upgrader_count = Utils.get_role_count(hive.room, this.role);
    if(upgrader_count == 0) {
      return this.get_proto(300);
    } else {
      if(upgrader_count < 3)
        return this.get_proto(300);
    }
  }

  setup() : any {
    return new b3.composite.MemPriority([
      new b3.composite.MemSequence([
        new Actions.FindConstructionSite(STRUCTURE_CONTAINER),
        new Actions.MoveToTarget(),
        new Actions.BuildTarget()
      ]),
      new b3.composite.MemSequence([
        new Actions.FindConstructionSite(STRUCTURE_EXTENSION),
        new Actions.MoveToTarget(),
        new Actions.BuildTarget()
      ]),
      new b3.composite.MemSequence([
        new Actions.FindTarget(STRUCTURE_CONTROLLER),
        new Actions.MoveToTarget(),
        new Actions.TransferTarget()
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
    ]);
  }
}
