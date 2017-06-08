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
var HarvestSource = (function (_super) {
    __extends(HarvestSource, _super);
    function HarvestSource() {
        return _super.call(this, 'HarvestSource') || this;
    }
    HarvestSource.prototype.tick = function (tick) {
        var creep = tick.target;
        //console.log('HarvestSource.tick', creep.name);
        var en = creep.carry.energy || 0;
        var source = Game.getObjectById(creep.memory.source);
        if (!source)
            return _1.default.State.FAILURE;
        if (en < creep.carryCapacity) {
            if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            return _1.default.State.RUNNING;
        }
        delete creep.memory.source; // we don't need to know this anymore
        return _1.default.State.SUCCESS;
    };
    return HarvestSource;
}(basenode_1.default));
exports.HarvestSource = HarvestSource;
profiler.registerClass(HarvestSource, 'HarvestSource');
