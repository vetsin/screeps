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
var CheckTargetEnergy = (function (_super) {
    __extends(CheckTargetEnergy, _super);
    function CheckTargetEnergy() {
        return _super.call(this, 'CheckEnergy') || this;
    }
    CheckTargetEnergy.prototype.tick = function (tick) {
        var creep = tick.target;
        //console.log(creep.name, 'check energy', creep.memory.target)
        if (creep.memory.target) {
            var target = Game.getObjectById(creep.memory.target);
            if (target) {
                if (target.structureType == STRUCTURE_SPAWN) {
                    var tgt = target;
                    if (tgt.energy < tgt.energyCapacity)
                        return _1.default.State.SUCCESS;
                }
            }
        }
        return _1.default.State.FAILURE;
    };
    return CheckTargetEnergy;
}(basenode_1.default));
exports.CheckTargetEnergy = CheckTargetEnergy;
