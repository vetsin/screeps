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
var DropResource = (function (_super) {
    __extends(DropResource, _super);
    function DropResource(resource) {
        var _this = _super.call(this, 'DropResource') || this;
        _this.resource = resource || RESOURCE_ENERGY;
        return _this;
    }
    DropResource.prototype.tick = function (tick) {
        //console.log('FindTarget.tick')
        var creep = tick.target;
        creep.drop(this.resource);
        return _1.default.State.SUCCESS;
    };
    return DropResource;
}(basenode_1.default));
exports.DropResource = DropResource;
