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
var RepairTarget = (function (_super) {
    __extends(RepairTarget, _super);
    function RepairTarget() {
        return _super.call(this, 'RepairTarget') || this;
    }
    RepairTarget.prototype.tick = function (tick) {
        var creep = tick.target;
        var target = Game.getObjectById(creep.memory.target);
        if (!target)
            return _1.default.State.FAILURE;
        if (creep.carry.energy && creep.carry.energy > 0) {
            if (target.hits < target.hitsMax) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                return _1.default.State.RUNNING;
            }
        }
        return _1.default.State.SUCCESS;
    };
    return RepairTarget;
}(basenode_1.default));
exports.RepairTarget = RepairTarget;
