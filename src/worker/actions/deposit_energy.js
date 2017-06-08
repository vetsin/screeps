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
var DepositEnergy = (function (_super) {
    __extends(DepositEnergy, _super);
    function DepositEnergy() {
        return _super.call(this, 'Deposit') || this;
    }
    DepositEnergy.prototype.tick = function (tick) {
        //console.log('FindTarget.tick')
        var creep = tick.target;
        var target = Game.getObjectById(creep.memory.target);
        if (!target)
            return _1.default.State.FAILURE;
        if (creep.carry.energy && creep.carry.energy > 0) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            return _1.default.State.RUNNING;
        }
        delete creep.memory.target;
        return _1.default.State.SUCCESS;
        /*
        if(creep.carry.energy && creep.carry.energy > 0)
          return b3.State.RUNNING;
        return b3.State.SUCCESS;
        if(target.structureType == STRUCTURE_CONTROLLER ||
            target.structureType == STRUCTURE_STORAGE ||
            target.structureType == STRUCTURE_TERMINAL) {
            let tgt = target as StructureContainer | StructureStorage | StructureTerminal;
            if(_.sum(tgt.store) < tgt.storeCapacity)
              return b3.State.RUNNING;
        } else if (target.structureType == STRUCTURE_LINK) {
          let tgt = target as StructureLink;
          if(tgt.energy < tgt.energyCapacity)
            return b3.State.RUNNING;
        }
        */
    };
    return DepositEnergy;
}(basenode_1.default));
exports.DepositEnergy = DepositEnergy;
