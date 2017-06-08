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
var FindRole = (function (_super) {
    __extends(FindRole, _super);
    function FindRole(role) {
        var _this = _super.call(this, 'FindRole') || this;
        _this.role = role;
        return _this;
    }
    FindRole.prototype.tick = function (tick) {
        var _this = this;
        //console.log('FindTarget.tick')
        var creep = tick.target;
        // just get the closest
        var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function (c) { return c.memory.role == _this.role && _.sum(c.carry) < c.carryCapacity; }
        });
        if (!target)
            return _1.default.State.FAILURE;
        creep.memory.target = target.id;
        return _1.default.State.SUCCESS;
    };
    return FindRole;
}(basenode_1.default));
exports.FindRole = FindRole;
