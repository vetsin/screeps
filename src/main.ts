import b3 from "./lib/b3/index";
import * as Config from "./config/config";
import * as Conditions from "./worker/conditions";
import { log } from "./lib/logger/log";
import * as Profiler from "screeps-profiler";
import * as Roles from "./worker/roles";
import {Hatchery} from "./components/hatchery";

if (Config.USE_PROFILER) {
  Profiler.enable();
}

log.info(`loading revision: ${ __REVISION__ }`);

// Generate Behavior Tree

function setupBehaviorTree(): void {
  global.blackboard = new b3.Blackboard();
  const roomNodes = [new Conditions.IsRoom(), new Hatchery().construct()];

  const childRoles = [];
  for (const role in Roles) {
    const workerClass = (Roles as any)[role];
    const worker = new workerClass();
    const tree = worker.construct_tree();
    childRoles.push(tree);
  }
  const seq = new b3.composite.MemPriority([
    // rooms
    new b3.composite.MemSequence(roomNodes),
    // nodes
    new b3.composite.MemSequence([
      new Conditions.IsCreep(),
      new b3.composite.MemPriority(childRoles)
    ])
  ]);
  global.tree = new b3.BehaviorTree("root", seq);
}

// Setup Tree
if (global.tree === undefined) {
  setupBehaviorTree();
}

function mloop() {
  // Clear memory
  for (const name in Memory.creeps) {
    if (Game.creeps[name] === undefined) {
      // then delete
      global.tree.delete_memory(name, global.blackboard);
      delete Memory.creeps[name];
    }
  }

  // Tick Rooms
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    global.tree.tick(room, global.blackboard);
  }

  // Tick Creeps
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    global.tree.tick(creep, global.blackboard);
  }

}

export const loop = !Config.USE_PROFILER ? mloop : Profiler.wrap(mloop);
