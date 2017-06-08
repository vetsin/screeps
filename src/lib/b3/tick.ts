import BaseNode from "./basenode";
import BehaviorTree from "./tree";
import Blackboard from "./blackboard";

/**
 * Represent a tick (update) which holds context for the tree traversal.
 */
export default class Tick {
  public tree: BehaviorTree;
  public openNodes: BaseNode[];
  public nodeCount: number;
  public target: Creep | Room;
  public blackboard: Blackboard;

  constructor(tree: BehaviorTree, target: Creep | Room, blackboard: Blackboard) {
    this.tree = tree;
    this.openNodes = [];
    this.nodeCount = 0;
    this.target = target;
    this.blackboard = blackboard;
  }

  public setReturn(node: BaseNode, key: string, value: string): void {
    let mem = this.blackboard.get("returnValue", this.tree.id);
    if (mem === undefined) {
      mem = {};
    }
    mem[key] = value;
    this.blackboard.set("returnValue", mem, this.tree.id);
  }

  public getReturn(node: BaseNode, key: string): string | undefined {
    const mem = this.blackboard.get("returnValue", this.tree.id);
    return mem[key];
  }
  /**
   * Push the node to opened nodes.
   *
   * @method  enterNode
   * @param  {BaseNode} node The node to open.
   */
  public enterNode(node: BaseNode): void {
    this.nodeCount += 1;
    this.openNodes.push(node);
  }
  /**
   * Close the first node.
   *
   * @method  closeNode
   */
  public closeNode(node: BaseNode): void {
    this.openNodes.pop();
  }
  // may be extended for debug
  public openNode(node: BaseNode): void {}
  public tickNode(node: BaseNode): void {}
  public exitNode(node: BaseNode): void {
    // Cleanup returnValue of a depth > currentDepth
  }
}
