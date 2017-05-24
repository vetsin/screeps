import {Hive} from "../Hive";

export class Hatchery {
  availableSpawns: 0;
  hive: Hive;
  spawns: Spawn[];
  //queue: protoCreep[];

  constructor(hive: Hive) {
    this.hive = hive;
    this.spawns = this.hive.room.find<Spawn>(FIND_MY_SPAWNS);
  }

  private getSpawnsAvailable(): Spawn[] {
    return _.filter(this.spawns, (spawn: Spawn) => { return !spawn.spawning });
  }

  public spawnAvailable(): boolean {
    return this.getSpawnsAvailable().length > 0;
  }

  public getBestSpawn() : Spawn {
    //TODO: actually return the best spawn
    return _.filter(this.spawns, (spawn: Spawn) => { return !spawn.spawning })[0];
  }

  public canSpawn(cost: number) : boolean {
    let spawns = this.getSpawnsAvailable();
    for(let spawn of spawns) {
      if(spawn.energy >= cost)
        return true;
    }
    return false;
  }

  public spawnCreep(pc: protoCreep): number | string {
    //console.log('spawncreep')
    let spawn: Spawn = _.sample(this.getSpawnsAvailable());
    //console.log(pc.body);
    //console.log(pc.name);
    //console.log(pc.memory);
    if(spawn)
      return spawn.createCreep(pc.body, pc.name, pc.memory);
    else
      console.log('no spawn to spawn')
    //  return spawn.createCreep(pc.body, pc.name, pc.memory);
    return -1;
  }

}
