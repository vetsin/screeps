
/**
 * Blackboard - the memory structure for bt/nodes. Allow to store:
 * - global information
 * - per-tree information
 * - per-tree and per-node information
 */
export default class Blackboard {
  constructor() {
    if(!Memory.treeMemory) {
      Memory.baseMemory = {};
      Memory.treeMemory = {};
    }
  }
  /**
   * returns memory Map for given tree
   */
  getTreeMemory(treeScope : string) {
    if (!Memory.treeMemory[treeScope]) {
      Memory.treeMemory[treeScope] = {
        nodeMemory: {},
        openNodes: []
      };
    }

    return Memory.treeMemory[treeScope];
  }
  getNodeMemory(treeMemory : any, nodeScope : string) {
    var memory = treeMemory.nodeMemory;

    if (!memory[nodeScope]) {
      memory[nodeScope] = {};
    }

    return memory[nodeScope]
  }
  getMemory(treeScope : string, nodeScope? : string ) {
    var memory = Memory.baseMemory;

    if (treeScope !== undefined) {
      memory = this.getTreeMemory(treeScope);

      if (nodeScope !== undefined) {
        memory = this.getNodeMemory(memory, nodeScope);
      }
    }

    return memory;
  }
  set(key : string, value : any, treeScope: string, nodeScope? : string ) {
    var memory = this.getMemory(treeScope, nodeScope);

    memory[key] = value;
  }
  get(key : string, treeScope : string, nodeScope? : string) {
    var memory = this.getMemory(treeScope, nodeScope);

    return memory[key];
  }
}
