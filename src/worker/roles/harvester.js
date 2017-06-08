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
var utils_1 = require("./../../lib/b3/utils");
var Worker_1 = require("./../Worker");
var _1 = require("./../../lib/b3/");
var Actions = require("./../actions");
var Conditions = require("./../conditions");
var Utils = require("./../../components/utils");
var Harvester = (function (_super) {
    __extends(Harvester, _super);
    /*
    * Sit next to a source and just mine the crap out of it
    * Put everything into a container and repair that container
    */
    function Harvester() {
        return _super.call(this, "harvester") || this;
    }
    Harvester.prototype.shouldSpawn = function (room) {
        var harvester_count = Utils.get_role_count(room, this.role);
        if (harvester_count === 0) {
            return true;
        }
        else {
            var _loop_1 = function (source) {
                var source_mem = room.memory.sources[source];
                // TODO: refactor to lessen our loops
                var active_count = _.filter(Game.creeps, function (creep) {
                    return creep.room === room && creep.memory.assigned_source === source;
                }).length;
                if (active_count < 1 && source_mem.has_keeper === false) {
                    return { value: true };
                }
            };
            // find appropriate number of harvesters per source that doesn't have a keeper
            for (var source in room.memory.sources) {
                var state_1 = _loop_1(source);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
    };
    Harvester.prototype.defineCreep = function (room) {
        return this.get_proto(300);
    };
    Harvester.prototype.create = function (hive) {
        var harvester_count = Utils.get_role_count(hive.room, this.role);
        //global.log.debug(hive.room.name, this.role, 'count is', harvester_count);
        if (harvester_count == 0) {
            // spawn at least one
            return this.get_proto(300); // HACK
        }
        else {
            var _loop_2 = function (source) {
                var source_mem = hive.room.memory.sources[source];
                // we need to know how many are assgined already to this source
                var active_count = hive.creeps.filter(function (creep) {
                    return creep.memory.assigned_source == source;
                }).length;
                //if(active_count < source_mem.harvester_count) {
                if (active_count < 1 && source_mem.has_keeper == false) {
                    return { value: this_1.get_proto(300) };
                }
            };
            var this_1 = this;
            // find appropriate number of harvesters per source that doesn't have a keeper
            for (var source in hive.room.memory.sources) {
                var state_2 = _loop_2(source);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
        }
    };
    Harvester.prototype.setup = function () {
        return new _1.default.composite.MemSequence([
            new Actions.FindSource(),
            new Actions.HarvestSource(),
            new _1.default.composite.MemPriority([
                // either deposit it
                new _1.default.composite.MemPriority([
                    new _1.default.composite.MemSequence([
                        new Actions.FindTarget(STRUCTURE_CONTAINER),
                        new Conditions.TargetIsWithin(3),
                        new Actions.RepairTarget(),
                        new Actions.TransferTarget()
                    ]),
                    // build it
                    new _1.default.composite.MemSequence([
                        new Actions.FindConstructionSite(STRUCTURE_CONTAINER, 4),
                        new Actions.BuildTarget()
                    ]),
                    // construct it
                    new _1.default.composite.MemSequence([
                        new Actions.FindSource(),
                        new Actions.ConstructContainer()
                    ])
                ]),
            ])
        ]);
    };
    Harvester.prototype.get_proto = function (energy) {
        return {
            body: [WORK, WORK, CARRY, MOVE],
            name: this.get_name(),
            memory: {
                role: this.role,
                tree: utils_1.createUUID()
            }
        };
    };
    return Harvester;
}(Worker_1.Worker));
exports.Harvester = Harvester;
