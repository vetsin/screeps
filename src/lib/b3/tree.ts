/**
 * module behavior3
 */

import {createUUID} from './utils';
import BaseNode from './basenode';
import Blackboard from './blackboard';
import Tick from './tick';

/**
 * A behavior tree.
 *
 * @class  BehaviorTree
 */
export default class BehavoirTree {
  public id: string;
  public root: BaseNode;
  private saved_id: string;
  private debug: boolean;
  /**
   * @constructor
   * @class  BehaviorTree
   */
  constructor(id: string, root: BaseNode) {
    /**
     * Unique ID of the BehaviorTree, this id is used when storing / retrieving
     * data to the blackboard object.
     *
     * @property {Number} id
     */
    this.id = id || createUUID() + "";
    this.saved_id = id;

    this.debug = false;
    /**
     * The root node of the tree.
     *
     * @property {BaseNode} root
     */
    this.root = root;
  }

  /**
   * Apply the behavior tree to an entity with a context blackboard.
   *
   * @method  tick
   * @param  {*} target The target object of the tick.
   * @param  {Backbord} blackboard The blackboard too use as context.
   */
  public tick(target: Creep | Room, blackboard: Blackboard): number {
    this.id = this.saved_id + "_" + target.name;

    const tick = new Tick(this, target, blackboard);

    // execute the whole tree
    const state = this.root.execute(tick);

    /* CLOSE NODES FROM LAST TICK, IF NEEDED */
    const lastOpenNodes = blackboard.get("openNodes", this.id);
    const currOpenNodes = tick.openNodes.slice(0);

    let start = 0;
    const max = Math.min(lastOpenNodes.length, currOpenNodes.length);

    // does not close if still open in this tick
    for (let i = 0; i < max; i += 1) {
      start = i + 1;
      if (lastOpenNodes[i] !== currOpenNodes[i]) {
        break;
      }
    }

    // close the nodes that are still opened
    for (let i = lastOpenNodes.length - 1; i >= start; i --) {
      const node = this.find_node(lastOpenNodes[i].name);
      if (node) {
        node._close(tick);
      }
    }

    /* POPULATE BLACKBOARD */
    blackboard.set("openNodes", currOpenNodes, this.id);
    blackboard.set("nodeCount", tick.nodeCount, this.id);

    this.id = this.saved_id;
    return state;
  }

  public delete_memory(creepName: string, blackboard: Blackboard): void {
    blackboard.delete(this.saved_id + "_" + creepName);
  }

  private find_node(id: string, node?: BaseNode): BaseNode | undefined {
    // walk tree :(
    const mynode = node || this.root;
    if (mynode.id === id) {
      return mynode;
    }
    if ((mynode as any).childs !== undefined) {
      const chillen = (mynode as any).childs as BaseNode[];
      for (const mn of chillen) {
        const res = this.find_node(id, mn);
        if (res) {
          return res;
        }
      }
    }
    return undefined;
  }

}
