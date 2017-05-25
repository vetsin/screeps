// Represents a room
import {Hatchery} from "components/hatchery";
import {Worker} from "./worker/Worker";
import * as Roles from './worker/roles';
import b3 from './lib/b3/index';
import map_role from "./worker/Mapper";
//import {CreepMemory} from './components/CreepMemory';
//import b3 from './lib/b3/index';

export class Hive {
  name: string;
  room: Room;
  //creeps: Creep[];
  hatchery: Hatchery;
  //workers: Worker[];
  // Store Local
  tree: any;
  tree_id: string;
  blackboard: any;
  //blackboard: b3.Blackboard;

  constructor(hiveName: string) {
    this.name = hiveName;
    this.room = Game.rooms[this.name];
    this.hatchery = new Hatchery(this);
    //this.workers = [];
    this.setup();
  }

  private setup() : void {
    // Construct our workers
    this.blackboard = new b3.Blackboard();
    let childs = [];
    // Build for every role, not every creep.
    //for(let creep of this.creeps) {
    for(let role in Roles) {
      //let workerClass = map_role(creep.name);
      //let worker = new workerClass(creep.name);
      let workerClass = (Roles as any)[role];
      let worker = new workerClass(role);
      childs.push(worker.construct_tree());
    }
    let seq = new b3.composite.MemPriority(childs);
    seq.set_id(this.name);
    this.tree = new b3.BehaviorTree(this.name, seq);
    this.tree_id = this.tree.id;
  }

  public tick_creeps() : void {
    for(let creep of this.creeps) {
      // A tree in memory per creep.
      this.tree.id = this.tree_id + creep.name;
      this.tree.tick(creep, this.blackboard);
    }
  }

  get creeps(): Creep[] {
    return _.filter(Game.creeps, (creep: Creep) => { return creep.room.name == this.name });
  }

/*
  public get_workers(role: string) : Worker[] {
    if(this.workers.length == 0)
      return [];
    return _.filter(this.workers, (worker: Worker) => {
      return worker.role == role;
    });
  }
*/

  get miningPowerNeeded(): number {
    let required = 0;

    return required;
  }
}
