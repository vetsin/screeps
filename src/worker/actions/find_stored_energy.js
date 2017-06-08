"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var basenode_1 = require("./../../lib/b3/basenode");
var _1 = require("./../../lib/b3/");
var state_1 = require("./../../components/state");
var FindStoredEnergy = (function (_super) {
    __extends(FindStoredEnergy, _super);
    /*
    * Get Stored
    */
    function FindStoredEnergy() {
        return _super.call(this, 'FindStoredEnergy') || this;
    }
    FindStoredEnergy.prototype.tick = function (tick) {
        var creep = tick.target;
        // Stay on target...
        if (creep.memory.target) {
            var tgt = Game.getObjectById(creep.memory.target);
            if (tgt instanceof Structure) {
                if (tgt.structureType == STRUCTURE_CONTAINER)
                    return _1.default.State.SUCCESS;
            }
        }
        var state = new state_1.RoomState(creep.room);
        if (_.sum(creep.carry) < creep.carryCapacity) {
            var actual_capacity = creep.carryCapacity - _.sum(creep.carry);
            var container = creep.room.find(FIND_STRUCTURES, {
                filter: function (s) {
                    if (s.structureType == STRUCTURE_CONTAINER) {
                        var sc = s;
                        //console.log(sc.store[RESOURCE_ENERGY], ' ', state.get_earmarked_energy(s.id), ' ', sc.store[RESOURCE_ENERGY])
                        return sc.store[RESOURCE_ENERGY] > 0; // &&
                        //state.get_earmarked_energy(s.id) < sc.store[RESOURCE_ENERGY];
                    }
                    return false;
                }
            });
            if (container.length == 0)
                return _1.default.State.FAILURE;
            //let earmarked = state.get_earmarked_energy(container.id);
            //if(container.store.energy > earmarked) {
            //let earmark_energy_count = container.store.energy > actual_capacity ? actual_capacity : container.store.energy;
            //state.earmark_energy(container.id, earmark_energy_count)
            creep.memory.target = _.sample(container).id;
            return _1.default.State.SUCCESS;
            //}
            // we failed...
            //return b3.State.FAILURE;
        }
        return _1.default.State.FAILURE;
    };
    return FindStoredEnergy;
}(basenode_1.default));
exports.FindStoredEnergy = FindStoredEnergy;
