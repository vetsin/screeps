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
var Sequence = (function (_super) {
    __extends(Sequence, _super);
    function Sequence(childs) {
        var _this = _super.call(this, 'Sequence') || this;
        _this.childs = [];
        childs.map(function (c) { return _this.childs.push(c); });
        return _this;
    }
    Sequence.prototype.enter = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth + 1, tick.tree.id);
    };
    Sequence.prototype.exit = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth - 1, tick.tree.id);
    };
    Sequence.prototype.tick = function (tick) {
        for (var i = 0; i < this.childs.length; i += 1) {
            var status = this.childs[i].execute(tick);
            if (status !== state_1.default.SUCCESS) {
                return status;
            }
        }
        return state_1.default.SUCCESS;
    };
    return Sequence;
}(basenode_1.default));
exports.default = Sequence;
