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
var Priority = (function (_super) {
    __extends(Priority, _super);
    function Priority(childs) {
        var _this = _super.call(this, 'Priority') || this;
        _this.childs = [];
        childs.map(function (c) { return _this.childs.push(c); });
        return _this;
    }
    Priority.prototype.enter = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth + 1, tick.tree.id);
    };
    Priority.prototype.exit = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth - 1, tick.tree.id);
    };
    Priority.prototype.tick = function (tick) {
        for (var i = 0; i < this.childs.length; i += 1) {
            var status = this.childs[i].execute(tick);
            if (status !== state_1.default.FAILURE) {
                return status;
            }
        }
        return state_1.default.FAILURE;
    };
    return Priority;
}(basenode_1.default));
exports.default = Priority;
