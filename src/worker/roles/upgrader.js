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
// const profiler = require('screeps-profiler');
var Upgrader = (function (_super) {
    __extends(Upgrader, _super);
    /*
    * Pick up energy from Harvesters and upgrade controller
    */
    function Upgrader() {
        return _super.call(this, 'upgrader') || this;
    }
    Upgrader.prototype.shouldSpawn = function (room) {
        // we don't need any of these till our controller level is high enough to warrent it
        var controllerArray = room.find(FIND_MY_STRUCTURES, { filter: function (s) { return s.structureType === STRUCTURE_CONTROLLER; }
        });
        if (controllerArray.length <= 0) {
            return false;
        }
        var controler = controllerArray[0];
        var upgraderCount = Utils.get_role_count(room, this.role);
        // we need conductors to function
        var conductorCount = Utils.get_role_count(room, 'conductor');
        return conductorCount > 0 && upgraderCount < controler.level / 2;
    };
    Upgrader.prototype.defineCreep = function (room) {
        return this.get_proto(300);
    };
    Upgrader.prototype.setup = function () {
        return new _1.default.composite.Priority([
            new _1.default.composite.MemSequence([
                new Actions.FindTarget(STRUCTURE_CONTROLLER),
                new Actions.MoveToTarget(),
                new Actions.TransferTarget()
            ])
        ]);
    };
    Upgrader.prototype.get_proto = function (energy) {
        return {
            body: [WORK, WORK, CARRY, MOVE],
            name: this.get_name(),
            memory: {
                role: this.role
            }
        };
    };
    return Upgrader;
}(Worker_1.Worker));
exports.Upgrader = Upgrader;
