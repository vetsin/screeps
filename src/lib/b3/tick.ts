import BehaviorTree from './tree';
import Blackboard from './blackboard';
import BaseNode from './basenode';

/**
 * Represent a tick (update) which holds context for the tree traversal.
 */
export default class Tick {
  tree: BehaviorTree;
  openNodes: BaseNode[];
  nodeCount: number;
  target: any;
  blackboard: Blackboard;

  constructor(tree : BehaviorTree, target : any, blackboard : Blackboard) {
    this.tree = tree;
    this.openNodes = [];
    this.nodeCount = 0;
    this.target = target;
    this.blackboard = blackboard;
  }
  /**
   * Push the node to opened nodes.
   *
   * @method  enterNode
   * @param  {BaseNode} node The node to open.
   */
  public enterNode(node : BaseNode) : void {
    this.nodeCount += 1;
    this.openNodes.push(node);
  }
  /**
   * Close the first node.
   *
   * @method  closeNode
   */
  public closeNode(node : BaseNode) : void {
    this.openNodes.pop();
  }
  // may be extended for debug
  public openNode(node : BaseNode) : void {}
  public tickNode(node : BaseNode) : void {}
  public exitNode(node : BaseNode) : void {}
}
