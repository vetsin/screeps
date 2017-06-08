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
var Worker_1 = require("./../Worker");
var _1 = require("./../../lib/b3/");
var Actions = require("./../actions");
var Utils = require("./../../components/utils");
var Healer = (function (_super) {
    __extends(Healer, _super);
    /*
    * Move energy around
    */
    function Healer() {
        return _super.call(this, 'healer') || this;
    }
    Healer.prototype.shouldSpawn = function (room) {
    };
    Healer.prototype.defineCreep = function (room) {
    };
    Healer.prototype.get_proto = function (energy) {
        return {
            body: [MOVE, HEAL],
            name: this.get_name(),
            memory: {
                role: this.role
            }
        };
    };
    Healer.prototype.create = function (hive) {
        var guard_count = Utils.get_role_count(hive.room, 'guard');
        var healer_count = Utils.get_role_count(hive.room, this.role);
        if (healer_count / guard_count <= 0.25) {
            return this.get_proto(300);
        }
    };
    Healer.prototype.setup = function () {
        return new _1.default.composite.MemPriority([
            new _1.default.composite.MemSequence([
                new Actions.FindFlag('Hangout'),
                new Actions.MoveToTarget()
            ]),
        ]);
    };
    return Healer;
}(Worker_1.Worker));
exports.Healer = Healer;
