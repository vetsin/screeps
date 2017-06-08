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
var Conditions = require("./../conditions");
var Utils = require("./../../components/utils");
var profiler = require('screeps-profiler');
var Conductor = (function (_super) {
    __extends(Conductor, _super);
    /*
    * Move energy around
    */
    function Conductor() {
        return _super.call(this, "conductor") || this;
    }
    Conductor.prototype.shouldSpawn = function (room) {
        // we don't need conductors if we don't have any built containers...
        var containers = room.find(FIND_STRUCTURES, {
            filter: function (s) { return s.structureType === STRUCTURE_CONTAINER; }
        }).length;
        if (containers <= 0) {
            return false;
        }
        var harvesterCount = Utils.get_role_count(room, "harvester");
        var conductorCount = Utils.get_role_count(room, this.role);
        // number of conductors should be dependent at our controller level (e.g. how much Work a harvester has)
        var controllerArray = room.find(FIND_MY_STRUCTURES, { filter: function (s) { return s.structureType === STRUCTURE_CONTROLLER; }
        });
        if (controllerArray.length <= 0) {
            return false;
        }
        var controler = controllerArray[0];
        var multiplier = controler.level;
        if (conductorCount < harvesterCount * multiplier) {
            return true;
        }
        return false;
    };
    Conductor.prototype.defineCreep = function (room) {
        return this.get_proto(300);
    };
    Conductor.prototype.get_proto = function (energy) {
        return {
            body: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            name: this.get_name(),
            memory: {
                role: this.role
            }
        };
    };
    Conductor.prototype.create = function (hive) {
        var harvester_count = Utils.get_role_count(hive.room, 'harvester');
        var conductor_count = Utils.get_role_count(hive.room, this.role);
        if (conductor_count === 0) {
            return this.get_proto(300);
        }
        else {
            if (harvester_count === 0)
                return undefined;
            if (conductor_count < harvester_count * 2)
                return this.get_proto(300);
        }
    };
    Conductor.prototype.setup = function () {
        return new _1.default.composite.MemPriority([
            new _1.default.composite.MemSequence([
                // get energy
                new _1.default.composite.MemPriority([
                    // if we're full do nothing
                    new Conditions.AlreadyFull(),
                    // else try to find stored energy
                    new _1.default.composite.MemSequence([
                        new Actions.FindStoredEnergy(),
                        new Actions.WithdrawTarget(RESOURCE_ENERGY),
                    ]),
                    // else find dropped energy
                    new _1.default.composite.MemSequence([
                        new Actions.FindDroppedResource(),
                        new Actions.PickupTarget()
                    ]),
                    // if we found no resource and have energy just do something with it.
                    new Conditions.HasEnergy()
                ]),
                // put it somewhere
                new _1.default.composite.MemPriority([
                    // prioritize spawn, we want creeps first.
                    new _1.default.composite.MemSequence([
                        new Actions.FindTarget(STRUCTURE_SPAWN),
                        new Conditions.CheckTargetEnergy(),
                        new Actions.TransferTarget()
                    ]),
                    new _1.default.composite.MemSequence([
                        new _1.default.composite.SuccessLoop([
                            new Actions.FindRole('builder'),
                            new Conditions.HasEnergy(),
                            new Actions.TransferTarget()
                        ])
                    ]),
                    new _1.default.composite.MemSequence([
                        new _1.default.composite.SuccessLoop([
                            new Actions.FindRole('upgrader'),
                            new Conditions.HasEnergy(),
                            new Actions.TransferTarget()
                        ])
                    ])
                ])
            ])
        ]);
    };
    return Conductor;
}(Worker_1.Worker));
exports.Conductor = Conductor;
profiler.registerClass(Conductor, 'Conductor');
