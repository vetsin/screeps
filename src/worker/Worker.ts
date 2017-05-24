import b3 from '../lib/b3/index';
import {Hive} from './../Hive';
const profiler = require('screeps-profiler');

//import {createUUID} from '../lib/b3/utils';
//import * as Actions from './actions';
//import * as Roles from './roles';

export abstract class Worker {
  name: string;
  role: string;
  //creep: Creep;
  tree: any;
  blackboard: any;
  tree_id: string;

  constructor(creepName: string, role: string) {
    this.name = creepName;
    this.role = role;

    if(creepName != '') {
      //console.log('gonna create a new tree..')
      this.tree_id = Game.creeps[creepName].memory.tree + '_' + this.name;
      //console.log('treeid ' + this.tree_id);
      this.tree = new b3.BehaviorTree(this.tree_id, this.setup());
      this.blackboard = new b3.Blackboard();
    }
  }

  abstract setup() : any;

  public abstract create(hive: Hive) : protoCreep | undefined;

  protected get_name() : string {
    let i = 0;
    while(Game.creeps[this.role + '_' + i] != undefined) {
      i++;
    }
    return this.role + '_' + i;
  }

  protected grow_parts(parts: string[], energy: number) {
    
  }

  public tick(): void {
    //this.tree.id = this.tree.id + this.name;
    this.tree.tick(Game.creeps[this.name], this.blackboard);
  }


}

profiler.registerClass(Worker, 'Worker');
