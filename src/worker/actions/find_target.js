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
var FindTarget = (function (_super) {
    __extends(FindTarget, _super);
    function FindTarget(targetType) {
        var _this = _super.call(this, 'FindTarget') || this;
        _this.target_type = targetType || STRUCTURE_SPAWN;
        return _this;
    }
    FindTarget.prototype.tick = function (tick) {
        var _this = this;
        //console.log('FindTarget.tick ', this.target_type)
        var creep = tick.target;
        // just get the closest
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function (s) { return s != undefined && s.structureType == _this.target_type; }
        });
        if (!target)
            return _1.default.State.FAILURE;
        creep.memory.target = target.id;
        return _1.default.State.SUCCESS;
    };
    return FindTarget;
}(basenode_1.default));
exports.FindTarget = FindTarget;
profiler.registerClass(FindTarget, 'FindTarget');
