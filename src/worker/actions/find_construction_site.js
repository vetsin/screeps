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
var FindConstructionSite = (function (_super) {
    __extends(FindConstructionSite, _super);
    function FindConstructionSite(targetType, range) {
        var _this = _super.call(this, "FindConstructionSite") || this;
        _this.target_type = targetType || STRUCTURE_STORAGE;
        _this.range = range || 4; // seems reasonable i guess?
        return _this;
    }
    FindConstructionSite.prototype.tick = function (tick) {
        var _this = this;
        var creep = tick.target;
        // just get the closest
        var target = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {
            filter: function (site) { return site !== undefined && site.structureType === _this.target_type; }
        });
        if (target && creep.pos.getRangeTo(target) <= this.range) {
            creep.memory.target = target.id;
            return _1.default.State.SUCCESS;
        }
        return _1.default.State.FAILURE;
    };
    return FindConstructionSite;
}(basenode_1.default));
exports.FindConstructionSite = FindConstructionSite;
