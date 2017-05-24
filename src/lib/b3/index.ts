/**
 * @module  behavior3
 */

import State from './constants/state';

import Blackboard from './blackboard';
import BaseNode from './basenode';
import BehaviorTree from './tree';
import Tick from './tick';

import Sequence from './composite/sequence';
import MemSequence from './composite/memsequence';
import Priority from './composite/priority';
import MemPriority from './composite/mempriority';

//import Action from './core/action';
//import Composite from './core/composite';
//import Conditon from './core/condition';

import Inverter from './decorator/inverter';

import Wait from './action/wait';

const profiler = require('screeps-profiler');

profiler.registerClass(Blackboard, 'Blackboard');
profiler.registerClass(BaseNode, 'BaseNode');
profiler.registerClass(BehaviorTree, 'BehaviorTree');
profiler.registerClass(Tick, 'Tick');
profiler.registerClass(Sequence, 'Sequence');
profiler.registerClass(MemSequence, 'MemSequence');
profiler.registerClass(Priority, 'Priority');
profiler.registerClass(MemPriority, 'MemPriority');


/**
 * This is what is returned by a `require('yagl-behavior3')`
 *
 * @class Behavior3
 */
export default {
  /**
   * @property {Object} State
   */
  State,
  /**
   * @property {class} Blackboard
   */
  Blackboard,
  /**
   * @property {class} BaseNode
   */
  BaseNode,
  /**
   * @property {class} BehaviorTree
   */
  BehaviorTree,
  /**
   * @property {class} Tick
   */
  Tick,
  composite: {
    Sequence,
    MemSequence,
    Priority,
    MemPriority
  },
  decorator: {
    Inverter
  },
  action: {
    Wait
  }
}
