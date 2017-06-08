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
var basenode_1 = require("./../basenode");
var Continue = (function (_super) {
    __extends(Continue, _super);
    function Continue(child) {
        var _this = _super.call(this, 'Continue') || this;
        _this.child = child;
        if (!child) {
            console.warn('[behavior3] a decorator was initialized without child (', _this.id, ')');
        }
        return _this;
    }
    Continue.prototype.tick = function (tick) {
        if (!this.child) {
            return state_1.default.SUCCESS;
        }
        var status = this.child.execute(tick);
        if (status !== state_1.default.RUNNING) {
            return state_1.default.SUCCESS;
        }
        return status;
    };
    return Continue;
}(basenode_1.default));
exports.default = Continue;
