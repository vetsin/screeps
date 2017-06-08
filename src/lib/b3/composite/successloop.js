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
var state_1 = require("../constants/state");
var basenode_1 = require("../basenode");
var SuccessLoop = (function (_super) {
    __extends(SuccessLoop, _super);
    /*
    * Loop as long as we have a success till we hit the limit
     */
    function SuccessLoop(childs, limit) {
        var _this = _super.call(this, 'Loop') || this;
        _this.limit = limit || 50;
        _this.childs = [];
        childs.map(function (c) { return _this.childs.push(c); });
        return _this;
    }
    SuccessLoop.prototype.enter = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth + 1, tick.tree.id);
    };
    SuccessLoop.prototype.exit = function (tick) {
        var depth = tick.blackboard.get("depth", tick.tree.id) || 0;
        tick.blackboard.set("depth", depth - 1, tick.tree.id);
    };
    SuccessLoop.prototype.open = function (tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
        tick.blackboard.set('loop', 0, tick.tree.id, this.id);
    };
    SuccessLoop.prototype.tick = function (tick) {
        var loop = tick.blackboard.get('loop', tick.tree.id, this.id);
        console.log('loop', loop, 'loops', this.limit);
        for (var j = loop; j < this.limit; j += 1) {
            var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
            console.log('looping', child);
            for (var i = child; i < this.childs.length; i += 1) {
                var status_1 = this.childs[i].execute(tick);
                if (status_1 !== state_1.default.SUCCESS) {
                    if (status_1 === state_1.default.RUNNING) {
                        tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                    }
                    return status_1;
                }
            }
            console.log('restarting loop');
            tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
            // don't forget to incriment
            tick.blackboard.set('loop', j, tick.tree.id, this.id);
        }
        return state_1.default.SUCCESS;
    };
    return SuccessLoop;
}(basenode_1.default));
exports.default = SuccessLoop;
