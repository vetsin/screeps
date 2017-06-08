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
var Utils = require("./../../components/utils");
var WorkerEquals = (function (_super) {
    __extends(WorkerEquals, _super);
    function WorkerEquals(role, count) {
        var _this = _super.call(this, 'WorkerEquals') || this;
        _this.role = role;
        _this.count = count;
        return _this;
    }
    WorkerEquals.prototype.tick = function (tick) {
        var creep = tick.target;
        var role_count = Utils.get_role_count(creep.room, this.role);
        if (role_count === this.count)
            return _1.default.State.SUCCESS;
        return _1.default.State.FAILURE;
    };
    return WorkerEquals;
}(basenode_1.default));
exports.WorkerEquals = WorkerEquals;
