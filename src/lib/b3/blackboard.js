"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Blackboard - the memory structure for bt/nodes. Allow to store:
 * - global information
 * - per-tree information
 * - per-tree and per-node information
 */
var Blackboard = (function () {
    function Blackboard() {
        if (!Memory.treeMemory) {
            Memory.baseMemory = {};
            Memory.treeMemory = {};
        }
    }
    /**
     * returns memory Map for given tree
     */
    Blackboard.prototype.getTreeMemory = function (treeScope) {
        if (!Memory.treeMemory[treeScope]) {
            Memory.treeMemory[treeScope] = {
                nodeMemory: {},
                openNodes: []
            };
        }
        return Memory.treeMemory[treeScope];
    };
    Blackboard.prototype.getNodeMemory = function (treeMemory, nodeScope) {
        var memory = treeMemory.nodeMemory;
        if (!memory[nodeScope]) {
            memory[nodeScope] = {};
        }
        return memory[nodeScope];
    };
    Blackboard.prototype.getMemory = function (treeScope, nodeScope) {
        var memory = Memory.baseMemory;
        if (treeScope !== undefined) {
            memory = this.getTreeMemory(treeScope);
            if (nodeScope !== undefined) {
                memory = this.getNodeMemory(memory, nodeScope);
            }
        }
        return memory;
    };
    Blackboard.prototype.set = function (key, value, treeScope, nodeScope) {
        var memory = this.getMemory(treeScope, nodeScope);
        memory[key] = value;
    };
    Blackboard.prototype.get = function (key, treeScope, nodeScope) {
        var memory = this.getMemory(treeScope, nodeScope);
        return memory[key];
    };
    Blackboard.prototype.delete = function (treeScope) {
        delete Memory.baseMemory[treeScope];
    };
    return Blackboard;
}());
exports.default = Blackboard;
