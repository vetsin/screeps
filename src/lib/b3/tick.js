"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represent a tick (update) which holds context for the tree traversal.
 */
var Tick = (function () {
    function Tick(tree, target, blackboard) {
        this.tree = tree;
        this.openNodes = [];
        this.nodeCount = 0;
        this.target = target;
        this.blackboard = blackboard;
    }
    Tick.prototype.setReturn = function (node, key, value) {
        var mem = this.blackboard.get("returnValue", this.tree.id);
        if (mem === undefined) {
            mem = {};
        }
        mem[key] = value;
        this.blackboard.set("returnValue", mem, this.tree.id);
    };
    Tick.prototype.getReturn = function (node, key) {
        var mem = this.blackboard.get("returnValue", this.tree.id);
        return mem[key];
    };
    /**
     * Push the node to opened nodes.
     *
     * @method  enterNode
     * @param  {BaseNode} node The node to open.
     */
    Tick.prototype.enterNode = function (node) {
        this.nodeCount += 1;
        this.openNodes.push(node);
    };
    /**
     * Close the first node.
     *
     * @method  closeNode
     */
    Tick.prototype.closeNode = function (node) {
        this.openNodes.pop();
    };
    // may be extended for debug
    Tick.prototype.openNode = function (node) { };
    Tick.prototype.tickNode = function (node) { };
    Tick.prototype.exitNode = function (node) {
        // Cleanup returnValue of a depth > currentDepth
    };
    return Tick;
}());
exports.default = Tick;
