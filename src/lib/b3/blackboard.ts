
/**
 * Blackboard - the memory structure for bt/nodes. Allow to store:
 * - global information
 * - per-tree information
 * - per-tree and per-node information
 */
export default class Blackboard {
  constructor() {
    if (!Memory.treeMemory) {
      Memory.baseMemory = {};
      Memory.treeMemory = {};
    }
  }
  /**
   * returns memory Map for given tree
   */
  public getTreeMemory(treeScope: string) {
    if (!Memory.treeMemory[treeScope]) {
      Memory.treeMemory[treeScope] = {
        nodeMemory: {},
        openNodes: []
      };
    }

    return Memory.treeMemory[treeScope];
  }
  public getNodeMemory(treeMemory: any, nodeScope: string) {
    const memory = treeMemory.nodeMemory;

    if (!memory[nodeScope]) {
      memory[nodeScope] = {};
    }

    return memory[nodeScope];
  }
  public getMemory(treeScope: string, nodeScope?: string ) {
    let memory = Memory.baseMemory;

    if (treeScope !== undefined) {
      memory = this.getTreeMemory(treeScope);

      if (nodeScope !== undefined) {
        memory = this.getNodeMemory(memory, nodeScope);
      }
    }

    return memory;
  }
  public set(key: string, value: any, treeScope: string, nodeScope?: string ): void {
    const memory = this.getMemory(treeScope, nodeScope);

    memory[key] = value;
  }
  public get(key: string, treeScope: string, nodeScope?: string): any | undefined {
    const memory = this.getMemory(treeScope, nodeScope);

    return memory[key];
  }
  public delete(treeScope: string): any {
    delete Memory.baseMemory[treeScope];
  }
}
