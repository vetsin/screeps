import {Hive} from "../Hive";
import b3 from './../lib/b3/index';
import BaseNode from './../lib/b3/basenode';
import Tick from './../lib/b3/tick';
import * as Actions from './../worker/actions';
import * as Conditions from './../worker/conditions';
import * as HatcheryNodes from "./../worker/hatchery";
import * as Roles from "./../worker/roles";

class ArchitectNode extends BaseNode {
  constructor() {
    super("ArchitectNode");
  }

  public tick(tick: Tick): number {
    const room = tick.target as Room;
    // we break this out locally because we're taking the classic route

    const controllerArray = room.find(FIND_MY_STRUCTURES, { filter:
      (s: Structure) => s.structureType === STRUCTURE_CONTROLLER
    });
    if (controllerArray.length <= 0) {
      return b3.State.FAILURE;
    }
    const controller = controllerArray[0] as StructureController;


    return b3.State.SUCCESS;
  }
}

export class Architect {

  public construct(): BaseNode {
    return new ArchitectNode();
  }

}
