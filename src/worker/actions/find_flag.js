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
var FindFlag = (function (_super) {
    __extends(FindFlag, _super);
    function FindFlag(flag_name) {
        var _this = _super.call(this, 'FindFlag') || this;
        _this.flag_name = flag_name;
        return _this;
    }
    FindFlag.prototype.tick = function (tick) {
        var _this = this;
        console.log('FindFlag.tick ', this.flag_name);
        var creep = tick.target;
        // just get the closest
        var target = creep.room.find(FIND_FLAGS, {
            filter: function (f) { return f.name == _this.flag_name; }
        });
        if (target.length == 0)
            return _1.default.State.FAILURE;
        console.log('found flag');
        if (!creep.pos.isNearTo(target[0].pos)) {
            creep.moveTo(target[0].pos);
            return _1.default.State.RUNNING;
        }
        return _1.default.State.SUCCESS;
    };
    return FindFlag;
}(basenode_1.default));
exports.FindFlag = FindFlag;
