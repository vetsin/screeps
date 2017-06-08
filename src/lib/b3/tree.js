"use strict";
/**
 * module behavior3
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var tick_1 = require("./tick");
/**
 * A behavior tree.
 *
 * @class  BehaviorTree
 */
var BehavoirTree = (function () {
    /**
     * @constructor
     * @class  BehaviorTree
     */
    function BehavoirTree(id, root) {
        /**
         * Unique ID of the BehaviorTree, this id is used when storing / retrieving
         * data to the blackboard object.
         *
         * @property {Number} id
         */
        this.id = id || utils_1.createUUID() + "";
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
    BehavoirTree.prototype.tick = function (target, blackboard) {
        this.id = this.saved_id + "_" + target.name;
        var tick = new tick_1.default(this, target, blackboard);
        // execute the whole tree
        var state = this.root.execute(tick);
        /* CLOSE NODES FROM LAST TICK, IF NEEDED */
        var lastOpenNodes = blackboard.get("openNodes", this.id);
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
        for (var i = lastOpenNodes.length - 1; i >= start; i--) {
            var node = this.find_node(lastOpenNodes[i].name);
            if (node) {
                node._close(tick);
            }
        }
        /* POPULATE BLACKBOARD */
        blackboard.set("openNodes", currOpenNodes, this.id);
        blackboard.set("nodeCount", tick.nodeCount, this.id);
        this.id = this.saved_id;
        return state;
    };
    BehavoirTree.prototype.delete_memory = function (creepName, blackboard) {
        blackboard.delete(this.saved_id + "_" + creepName);
    };
    BehavoirTree.prototype.find_node = function (id, node) {
        // walk tree :(
        var mynode = node || this.root;
        if (mynode.id === id) {
            return mynode;
        }
        if (mynode.childs !== undefined) {
            var chillen = mynode.childs;
            for (var _i = 0, chillen_1 = chillen; _i < chillen_1.length; _i++) {
                var mn = chillen_1[_i];
                var res = this.find_node(id, mn);
                if (res) {
                    return res;
                }
            }
        }
        return undefined;
    };
    return BehavoirTree;
}());
exports.default = BehavoirTree;
