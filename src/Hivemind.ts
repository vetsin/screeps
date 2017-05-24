import {Hive} from "Hive";

import * as Roles from "./worker/roles";

// Control our Hives
export class Hivemind {
  name: string;
  hive: Hive;

  constructor(hive: Hive) {
    this.name = "Hivemind";
    this.hive = hive;
  }

  _init(): void {

  }

  private decide_spawn(spawn: Spawn): protoCreep | undefined {
    // decide the spawn, in priority
    let harvester_proto = new Roles.Harvester('').create(this.hive);
    if(harvester_proto)
      return harvester_proto;

    let conductor_proto = new Roles.Conductor('').create(this.hive);
    if(conductor_proto)
      return conductor_proto;

    let builder_proto = new Roles.Builder('').create(this.hive);
    if(builder_proto)
      return builder_proto;

    let upgrader_proto = new Roles.Upgrader('').create(this.hive);
    if(upgrader_proto)
      return upgrader_proto;

    //let upgrader_proto = new Roles.Upgrader('').create(this.hive);
    //if(upgrader_proto)
    //  yield upgrader_proto;


    /*if(this.hive.creeps.length < 5) {
      //console.log('decided to spawn')
      //return new Harvester('').create(this.hive);
      return new Roles.Harvester('').create();
    }*/
    return undefined;
  }

  _spawn(): void {
    if(this.hive.hatchery.spawnAvailable()) {
      let spawn = this.hive.hatchery.getBestSpawn();
      let pc = this.decide_spawn(spawn)
      if(pc && spawn.energy >= 300) {
        global.log.info('Spawning New Creep : ', pc.name);
        this.hive.hatchery.spawnCreep(pc);
      }
    }
    //if(this.hive.hatchery.availableSpawns.length > 0) {
      //
    //}
  }


  run() : void {
    this._init();
    this._spawn();
    this.hive.tick_creeps();
  }

}
