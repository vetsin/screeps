import b3 from '../lib/b3/index';
import BaseNode from './../lib/b3/basenode';
import {Hive} from './../Hive';
//const profiler = require('screeps-profiler');
import * as Conditions from './conditions';

export abstract class Worker {
  name: string;
  role: string;
  currentUUID: number;

  constructor(creepName: string, role: string) {
    this.name = creepName;
    this.role = role;
    this.currentUUID = 0;
  }

  public construct_tree() : any {
    let worker_root = new b3.composite.MemSequence([
      new Conditions.CheckRole(this.role),
      this.setup()
    ]);
    this._set_ids(worker_root);
    return worker_root;
  }

  private _set_ids(node: BaseNode) : void {
    // Set all ID's in a deterministic manner unique to this worker
    node.set_id(this.createUUID());
    if((node as any).childs != undefined) {
      let chillen = (node as any).childs as BaseNode[]
      for(let mn of chillen) {
        this._set_ids(mn);
      }
    }
  }

  protected createUUID() : string {
    //let newid = this.currentUUID++;
    //return this.name + newid;
    return `${this.name}_${this.currentUUID++}`;
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

}

//profiler.registerClass(Worker, 'Worker');
