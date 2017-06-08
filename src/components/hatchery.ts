import {Hive} from "../Hive";
import b3 from './../lib/b3/index';
import BaseNode from './../lib/b3/basenode';
import Tick from './../lib/b3/tick';
import * as Actions from './../worker/actions';
import * as Conditions from './../worker/conditions';
import * as HatcheryNodes from "./../worker/hatchery";
import * as Roles from "./../worker/roles";

export class Hatchery {

  public construct(): BaseNode {
    const builderSequences = [];

    const priorityOrder = ['harvester', 'conductor', 'builder', 'upgrader'];
    for (const role of priorityOrder) {
      builderSequences.push(new b3.composite.MemSequence([
        new HatcheryNodes.ShouldSpawn(role),
        new HatcheryNodes.SpawnCreep(role)
      ]));
    }
    return new b3.composite.MemSequence([
      new HatcheryNodes.ChooseSpawn(),
      new b3.composite.MemPriority(builderSequences)
    ]);
  }

}
