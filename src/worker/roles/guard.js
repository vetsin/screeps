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
var Guard = (function (_super) {
    __extends(Guard, _super);
    /*
    * Move energy around
    */
    function Guard() {
        return _super.call(this, 'guard') || this;
    }
    Guard.prototype.shouldSpawn = function (room) {
        var guardCount = Utils.get_role_count(room, this.role);
        if (guardCount < 2) {
            return true;
        }
        return false;
    };
    Guard.prototype.defineCreep = function (room) {
        return this.get_proto(300);
    };
    Guard.prototype.get_proto = function (energy) {
        return {
            body: [TOUGH, RANGED_ATTACK, MOVE, ATTACK],
            name: this.get_name(),
            memory: {
                role: this.role
            }
        };
    };
    Guard.prototype.create = function (hive) {
        var guard_count = Utils.get_role_count(hive.room, this.role);
        if (guard_count < 2) {
            return this.get_proto(300);
        }
    };
    Guard.prototype.setup = function () {
        return new _1.default.composite.MemPriority([
            new _1.default.composite.MemSequence([
                new Actions.FindFlag('Hangout'),
                new Actions.MoveToTarget()
            ]),
        ]);
    };
    return Guard;
}(Worker_1.Worker));
exports.Guard = Guard;
