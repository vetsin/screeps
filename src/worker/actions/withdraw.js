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
var WithdrawTarget = (function (_super) {
    __extends(WithdrawTarget, _super);
    function WithdrawTarget(resourceType) {
        var _this = _super.call(this, 'WithdrawTarget') || this;
        _this.resourceType = resourceType || RESOURCE_ENERGY;
        return _this;
    }
    WithdrawTarget.prototype.tick = function (tick) {
        var creep = tick.target;
        var target = Game.getObjectById(creep.memory.target);
        if (!target) {
            return _1.default.State.FAILURE;
        }
        var state = new state_1.RoomState(creep.room);
        if (_.sum(creep.carry) < creep.carryCapacity) {
            var res = creep.withdraw(target, this.resourceType);
            if (res == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            else if (res == ERR_NOT_ENOUGH_RESOURCES) {
                // if we have ANY energy consider it a SUCCESS
                if (_.sum(creep.carry) > 0) {
                    return _1.default.State.SUCCESS;
                }
                return _1.default.State.FAILURE;
            }
            return _1.default.State.RUNNING;
        }
        //state.unmark_energy(target.id, creep.carry.energy);
        delete creep.memory.target;
        return _1.default.State.SUCCESS;
    };
    return WithdrawTarget;
}(basenode_1.default));
exports.WithdrawTarget = WithdrawTarget;
