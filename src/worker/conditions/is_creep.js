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
var IsCreep = (function (_super) {
    __extends(IsCreep, _super);
    /*
    * Is the target a creep?
     */
    function IsCreep() {
        return _super.call(this, "IsCreep") || this;
    }
    IsCreep.prototype.tick = function (tick) {
        if (tick.target instanceof Creep) {
            return _1.default.State.SUCCESS;
        }
        return _1.default.State.FAILURE;
    };
    return IsCreep;
}(basenode_1.default));
exports.IsCreep = IsCreep;
