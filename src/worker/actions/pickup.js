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
var PickupTarget = (function (_super) {
    __extends(PickupTarget, _super);
    function PickupTarget() {
        return _super.call(this, 'PickupTarget') || this;
    }
    PickupTarget.prototype.tick = function (tick) {
        var creep = tick.target;
        var target = Game.getObjectById(creep.memory.target);
        if (!target) {
            delete creep.memory.target;
            return _1.default.State.FAILURE;
        }
        var state = new state_1.RoomState(creep.room);
        var picked_up = 0;
        var current_capacity = creep.carryCapacity - _.sum(creep.carry);
        if (_.sum(creep.carry) < creep.carryCapacity) {
            //console.log(creep.name, 'pickup', target.id)
            //picked_up = target.amount;
            if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                // avoid traffic jams...
                if (creep.moveTo(target) == ERR_NO_PATH) {
                    delete creep.memory.target;
                    return _1.default.State.FAILURE;
                }
            }
            if (target.amount > 0)
                return _1.default.State.RUNNING;
        }
        //state.unmark_energy(target.id, picked_up > current_capacity ? current_capacity : picked_up);
        delete creep.memory.target;
        return _1.default.State.SUCCESS;
    };
    return PickupTarget;
}(basenode_1.default));
exports.PickupTarget = PickupTarget;
