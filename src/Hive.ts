// Represents a room
import {Hatchery} from "components/hatchery";
import {Worker} from "./worker/Worker";
import map_role from "./worker/Mapper";
//import {CreepMemory} from './components/CreepMemory';
//import b3 from './lib/b3/index';

export class Hive {
  name: string;
  room: Room;
  //creeps: Creep[];
  hatchery: Hatchery;
  workers: Worker[];
  // Store Local
  tree: any;
  //blackboard: b3.Blackboard;

  constructor(hiveName: string) {
    this.name = hiveName;
    this.room = Game.rooms[this.name];
    this.hatchery = new Hatchery(this);
    this.workers = [];
    this.setup();
  }

  private setup() : void {
    // Construct our workers
    for(let creep of this.creeps) {
      let workerClass = map_role(creep.name);
      if(workerClass) {
        let myWorker = new workerClass(creep.name);
        myWorker.setup()
        this.workers.push(myWorker);
      }
    }
  }

  public tick_creeps() : void {
    for(var worker of this.workers) {
      worker.tick();
    }
  }

  get creeps(): Creep[] {
    return _.filter(Game.creeps, (creep: Creep) => { return creep.room.name == this.name });
  }

  public get_workers(role: string) : Worker[] {
    if(this.workers.length == 0)
      return [];
    return _.filter(this.workers, (worker: Worker) => {
      return worker.role == role;
    });
  }

  get miningPowerNeeded(): number {
    let required = 0;

    return required;
  }
}
