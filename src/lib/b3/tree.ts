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
   * Load from JSON
   */
  public load(data: any, names: any) : void {
    names = names || {};
    this.title = data.title || this.title;
    this.description = data.description || this.description;
    this.properties = data.properties || this.properties;

    let nodes = {};

    for(let id in data.nodes) {
      let spec = data.nodes[id];
      var clazz;

        if (spec.name in names) {
          // Look for the name in custom nodes
          clazz = names[spec.name];
        //} else if (spec.name in b3) {
        //  // Look for the name in default nodes
        //  clazz = b3[spec.name];
        } else {
          // Invalid node name
          throw new EvalError('BehaviorTree.load: Invalid node name + "'+
                               spec.name+'".');
        }
/*
        node = new Cls(spec.properties);
        node.id = spec.id || node.id;
        node.title = spec.title || node.title;
        node.description = spec.description || node.description;
        node.properties = spec.properties || node.properties;

        nodes[id] = node;*/
    }

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
      //lastOpenNodes[i]._close(tick);
      //TODO: figure this out - these are just {}'s in memory
    }

    /* POPULATE BLACKBOARD */
    blackboard.set('openNodes', currOpenNodes, this.id);
    blackboard.set('nodeCount', tick.nodeCount, this.id);

    return state;
  }
}
