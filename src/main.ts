//import * as CreepManager from "./components/creeps/creepManager";
import * as Config from "./config/config";

import * as Profiler from "screeps-profiler";
import { log } from "./lib/logger/log";

import Q from "./Queen";
global.Queen = new Q;

// Any code written outside the `loop()` method is executed only when the
// Screeps system reloads your script.
// Use this bootstrap wisely. You can cache some of your stuff to save CPU.
// You should extend prototypes before the game loop executes here.

// This is an example for using a config variable from `config.ts`.
// NOTE: this is used as an example, you may have better performance
// by setting USE_PROFILER through webpack, if you want to permanently
// remove it on deploy
// Start the profiler
if (Config.USE_PROFILER) {
  Profiler.enable();
}

log.info(`loading revision: ${ __REVISION__ }`);

function mloop() {
  // Check memory for null or out of bounds custom objects
  if (!Memory.uuid || Memory.uuid > 100) {
    Memory.uuid = 0;
  }
  // Clear memory
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      // then delete
      delete Memory.creeps[name];
    }

  }

  global.Queen.initialize();

  for(let name in global.Queen.Hives) {
    global.Queen.Hiveminds[name].run();
  }
}

export const loop = !Config.USE_PROFILER ? mloop : Profiler.wrap(mloop);
