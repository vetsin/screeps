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
var profiler = require('screeps-profiler');
var TransferTarget = (function (_super) {
    __extends(TransferTarget, _super);
    function TransferTarget() {
        return _super.call(this, 'TransferTarget') || this;
    }
    TransferTarget.prototype.tick = function (tick) {
        var creep = tick.target;
        if (!creep.memory.target) {
            return _1.default.State.ERROR;
        }
        // console.log('TransferTarget.tick ', creep.name)
        var target = Game.getObjectById(creep.memory.target);
        // If we are targeting a spawn or extension, we need to be directly next to it - otherwise, we can be 3 away.
        if (_.sum(creep.carry) > 0) {
            var transferResult = ERR_INVALID_TARGET;
            if (target instanceof Structure && target.structureType === STRUCTURE_CONTROLLER) {
                transferResult = creep.upgradeController(target);
            }
            else {
                transferResult = creep.transfer(target, RESOURCE_ENERGY);
            }
            if (transferResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return _1.default.State.RUNNING;
            }
        }
        delete creep.memory.target;
        return _1.default.State.SUCCESS;
    };
    return TransferTarget;
}(basenode_1.default));
exports.TransferTarget = TransferTarget;
profiler.registerClass(TransferTarget, 'TransferTarget');
