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
var state_1 = require("./../constants/state");
var basenode_1 = require("./../basenode");
var MemPriority = (function (_super) {
    __extends(MemPriority, _super);
    function MemPriority(childs) {
        var _this = _super.call(this, "MemPriority") || this;
        _this.childs = [];
        childs.map(function (c) { return _this.childs.push(c); });
        return _this;
    }
    MemPriority.prototype.enter = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth + 1, tick.tree.id);
    };
    MemPriority.prototype.exit = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth - 1, tick.tree.id);
    };
    MemPriority.prototype.open = function (tick) {
        tick.blackboard.set("runningChild", 0, tick.tree.id, this.id);
    };
    MemPriority.prototype.tick = function (tick) {
        var child = tick.blackboard.get("runningChild", tick.tree.id, this.id);
        for (var i = child; i < this.childs.length; i += 1) {
            var status_1 = this.childs[i].execute(tick);
            if (status_1 !== state_1.default.FAILURE) {
                if (status_1 === state_1.default.RUNNING) {
                    tick.blackboard.set("runningChild", i, tick.tree.id, this.id);
                }
                return status_1;
            }
        }
        return state_1.default.FAILURE;
    };
    return MemPriority;
}(basenode_1.default));
exports.default = MemPriority;
