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
var CheckRole = (function (_super) {
    __extends(CheckRole, _super);
    function CheckRole(role) {
        var _this = _super.call(this, "CheckRole") || this;
        _this.role = role.toLowerCase();
        return _this;
    }
    CheckRole.prototype.tick = function (tick) {
        var creep = tick.target;
        if (creep && !creep.spawning && creep.memory.role === this.role) {
            return _1.default.State.SUCCESS;
        }
        return _1.default.State.FAILURE;
    };
    return CheckRole;
}(basenode_1.default));
exports.CheckRole = CheckRole;
