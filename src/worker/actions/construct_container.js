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
var ConstructContainer = (function (_super) {
    __extends(ConstructContainer, _super);
    // designed for Harvesters...
    function ConstructContainer() {
        return _super.call(this, "ConstructContainer") || this;
    }
    ConstructContainer.prototype.tick = function (tick) {
        var creep = tick.target;
        var source = Game.getObjectById(creep.memory.source);
        if (!source) {
            global.log.error("Cannot construct container - no source identified to build next to");
            return _1.default.State.FAILURE;
        }
        if (creep.pos.isNearTo(source)) {
            // find a suitable location
            var areaArr = _.filter(source.room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true), function (pos) {
                return pos.type === "terrain";
            });
            // TODO: at some point we should filter for structures and make sure we have a path...
            var site = _.min(areaArr, function (p) { return creep.pos.getRangeTo(p.x, p.y); });
            creep.room.createConstructionSite(site.x, site.y, STRUCTURE_CONTAINER);
            return _1.default.State.SUCCESS;
        }
        return _1.default.State.FAILURE;
    };
    return ConstructContainer;
}(basenode_1.default));
exports.ConstructContainer = ConstructContainer;
