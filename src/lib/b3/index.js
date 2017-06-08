"use strict";
/**
 * @module  behavior3
 */
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./constants/state");
var blackboard_1 = require("./blackboard");
var basenode_1 = require("./basenode");
var tree_1 = require("./tree");
var tick_1 = require("./tick");
var sequence_1 = require("./composite/sequence");
var memsequence_1 = require("./composite/memsequence");
var priority_1 = require("./composite/priority");
var mempriority_1 = require("./composite/mempriority");
var successloop_1 = require("./composite/successloop");
//import Action from './core/action';
//import Composite from './core/composite';
//import Conditon from './core/condition';
var inverter_1 = require("./decorator/inverter");
var continue_1 = require("./decorator/continue");
var wait_1 = require("./action/wait");
var profiler = require('screeps-profiler');
profiler.registerClass(blackboard_1.default, 'Blackboard');
profiler.registerClass(basenode_1.default, 'BaseNode');
profiler.registerClass(tree_1.default, 'BehaviorTree');
profiler.registerClass(tick_1.default, 'Tick');
profiler.registerClass(sequence_1.default, 'Sequence');
profiler.registerClass(memsequence_1.default, 'MemSequence');
profiler.registerClass(priority_1.default, 'Priority');
profiler.registerClass(mempriority_1.default, 'MemPriority');
/**
 * This is what is returned by a `require('yagl-behavior3')`
 *
 * @class Behavior3
 */
exports.default = {
    /**
     * @property {Object} State
     */
    State: state_1.default,
    /**
     * @property {class} Blackboard
     */
    Blackboard: blackboard_1.default,
    /**
     * @property {class} BaseNode
     */
    BaseNode: basenode_1.default,
    /**
     * @property {class} BehaviorTree
     */
    BehaviorTree: tree_1.default,
    /**
     * @property {class} Tick
     */
    Tick: tick_1.default,
    composite: {
        Sequence: sequence_1.default,
        MemSequence: memsequence_1.default,
        Priority: priority_1.default,
        MemPriority: mempriority_1.default,
        SuccessLoop: successloop_1.default
    },
    decorator: {
        Inverter: inverter_1.default,
        Continue: continue_1.default
    },
    action: {
        Wait: wait_1.default
    }
};
