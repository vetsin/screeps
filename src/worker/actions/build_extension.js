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
var profiler = require('screeps-profiler');
var BuildExtension = (function (_super) {
    __extends(BuildExtension, _super);
    function BuildExtension() {
        return _super.call(this, 'BuildExtension') || this;
    }
    BuildExtension.prototype.tick = function (tick) {
        var creep = tick.target;
        return _1.default.State.SUCCESS;
    };
    return BuildExtension;
}(basenode_1.default));
exports.BuildExtension = BuildExtension;
