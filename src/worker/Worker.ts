import b3 from '../lib/b3/index';
import BaseNode from './../lib/b3/basenode';
import * as Conditions from './conditions';

export abstract class Worker {
  // public name: string;
  public role: string;
  private currentID: number;

  constructor(role: string) {
    // this.name = creepName;
    this.role = role;
    this.currentID = 0;
  }

  public construct_tree(): BaseNode {
    const workerRoot = new b3.composite.MemSequence([
      new Conditions.CheckRole(this.role),
      this.setup()
    ]);
    this._set_ids(workerRoot);
    return workerRoot;
  }

  /**
   * Construct Tree
   */
  public abstract setup(): any;

  // public abstract create(hive: Hive): protoCreep | undefined;

  public abstract shouldSpawn(room: Room): boolean;

  public abstract defineCreep(room: Room): protoCreep;

  protected workerBody(workCount: number, carryCount: number, movecount: number): string[] {
    const body: string [] = [];
    for (let i = 0; i < workCount; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < carryCount; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < movecount; i++) {
      body.push(MOVE);
    }
    return body;
  }

  protected get_name(): string {
    let i = 0;
    while (Game.creeps[this.role + '_' + i] !== undefined) {
      i++;
    }
    return `${this.role}_${i}`;
  }

  protected createUUID(): string {
    return `${this.role}_${this.currentID++}`;
  }

  private _set_ids(node: BaseNode): void {
    // Set all ID's in a deterministic manner unique to this worker
    node.set_id(this.createUUID());
    if ((node as any).childs !== undefined) {
      const chillen = (node as any).childs as BaseNode[];
      for (const mn of chillen) {
        this._set_ids(mn);
      }
    }
  }
}
