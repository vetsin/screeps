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
var MemSequence = (function (_super) {
    __extends(MemSequence, _super);
    function MemSequence(childs) {
        var _this = _super.call(this, 'MemSequence') || this;
        _this.childs = [];
        childs.map(function (c) { return _this.childs.push(c); });
        return _this;
    }
    MemSequence.prototype.enter = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth + 1, tick.tree.id);
    };
    MemSequence.prototype.exit = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth - 1, tick.tree.id);
    };
    MemSequence.prototype.open = function (tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    };
    MemSequence.prototype.tick = function (tick) {
        var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
        for (var i = child; i < this.childs.length; i += 1) {
            var status = this.childs[i].execute(tick);
            if (status !== state_1.default.SUCCESS) {
                if (status === state_1.default.RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                }
                return status;
            }
        }
        return state_1.default.SUCCESS;
    };
    return MemSequence;
}(basenode_1.default));
exports.default = MemSequence;
