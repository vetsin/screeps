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
  id: string;
  title: string;
  description: string;
  properties: {};
  debug: boolean;
  root: BaseNode;
  /**
   * @constructor
   * @class  BehaviorTree
   */
  constructor(id : string, root: BaseNode) {
    /**
     * Unique ID of the BehaviorTree, this id is used when storing / retrieving
     * data to the blackboard object.
     *
     * @property {Number} id
     */
    this.id = id || createUUID() + '';

    this.title = 'The behavior tree';
    this.description = 'Default description';
    this.properties = {};
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
  public tick(target:Creep, blackboard : Blackboard) : number {
    var tick = new Tick(this, target, blackboard);

    // execute the whole tree
    var state = this.root.execute(tick);

    /* CLOSE NODES FROM LAST TICK, IF NEEDED */
    var lastOpenNodes = blackboard.get('openNodes', this.id);
    var currOpenNodes = tick.openNodes.slice(0);

    var start = 0;
    var max = Math.min(lastOpenNodes.length, currOpenNodes.length);

    // does not close if still open in this tick
    for (var i = 0; i < max; i += 1) {
      start = i + 1;
      if (lastOpenNodes[i] !== currOpenNodes[i]) {
        break;
      }
    }

    // close the nodes that are still opened
    for (var i = lastOpenNodes.length - 1; i >= start; i --) {
      let node = this.find_node(lastOpenNodes[i].name);
      if(node)
        node._close(tick);
    }

    /* POPULATE BLACKBOARD */
    blackboard.set('openNodes', currOpenNodes, this.id);
    blackboard.set('nodeCount', tick.nodeCount, this.id);

    return state;
  }


  private find_node(id: string, node? : BaseNode) : BaseNode | undefined {
    // walk tree :(
    var mynode = node || this.root;
    if(mynode.id == id)
      return mynode;
    if((mynode as any).childs != undefined) {
      let chillen = (mynode as any).childs as BaseNode[]
      for(let mn of chillen) {
        let res = this.find_node(id, mn);
        if(res)
          return res;
      }
    }
    return undefined;
  }

}
