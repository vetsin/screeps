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
var FindDroppedResource = (function (_super) {
    __extends(FindDroppedResource, _super);
    /*
    * Get Stored
    */
    function FindDroppedResource() {
        return _super.call(this, 'FindDroppedResource') || this;
    }
    FindDroppedResource.prototype.tick = function (tick) {
        //console.log('FindDroppedResource.tick')
        var creep = tick.target;
        // Stay on target...
        if (creep.memory.target) {
            var obj = Game.getObjectById(creep.memory.target);
            if (obj && obj instanceof Resource && obj.amount > 0) {
                return _1.default.State.SUCCESS;
            }
        }
        if (creep.carry.energy == undefined)
            return _1.default.State.FAILURE;
        //let state = new RoomState(creep.room);
        if (creep.carry.energy < creep.carryCapacity) {
            var actual_capacity = creep.carryCapacity - creep.carry.energy;
            var dropped = creep.room.find(FIND_DROPPED_RESOURCES, { filter: function (r) {
                    // loose guess on # of ticks it'll take to get there
                    var distance = Math.sqrt(Math.pow(creep.pos.x - creep.pos.y, 2) + Math.pow(r.pos.x - r.pos.y, 2));
                    var decay_guess = Math.ceil(r.amount / 1000) * distance;
                    var probable_pickup = r.amount - decay_guess;
                    return probable_pickup > 0; // && state.get_earmarked_energy(r.id) > decay_guess;
                }
            });
            if (dropped.length == 0)
                return _1.default.State.FAILURE;
            var to_get = _.sample(dropped);
            //let earmarked = state.get_earmarked_energy(to_get.id);
            //if(dropped.amount > earmarked) {
            //let earmark_energy_count = to_get.amount > actual_capacity ? actual_capacity : to_get.amount;
            //state.earmark_energy(to_get.id, earmark_energy_count)
            creep.memory.target = to_get.id;
            return _1.default.State.SUCCESS;
            //}
            // we failed...
            //return b3.State.FAILURE;
        }
        return _1.default.State.FAILURE;
    };
    return FindDroppedResource;
}(basenode_1.default));
exports.FindDroppedResource = FindDroppedResource;
