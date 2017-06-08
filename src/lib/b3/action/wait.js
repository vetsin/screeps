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
var Wait = (function (_super) {
    __extends(Wait, _super);
    function Wait(ms) {
        var _this = _super.call(this, 'Wait') || this;
        _this.endTime = ms || 0;
        return _this;
    }
    Wait.prototype.open = function (tick) {
        var startTime = (new Date()).getTime();
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    };
    Wait.prototype.tick = function (tick) {
        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
        if (currTime - startTime >= this.endTime) {
            return state_1.default.SUCCESS;
        }
        return state_1.default.RUNNING;
    };
    return Wait;
}(basenode_1.default));
exports.default = Wait;
