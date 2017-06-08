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
//import {createUUID} from './../../lib/b3/utils';
var Worker_1 = require("./../Worker");
var _1 = require("./../../lib/b3/");
var Actions = require("./../actions");
var Conditions = require("./../conditions");
var Utils = require("./../../components/utils");
var profiler = require('screeps-profiler');
var Builder = (function (_super) {
    __extends(Builder, _super);
    /*
    * Build stuff else upgrade when not busy
    */
    function Builder() {
        return _super.call(this, "builder") || this;
    }
    Builder.prototype.shouldSpawn = function (room) {
        var upgraderCount = Utils.get_role_count(room, this.role);
        if (upgraderCount === 0) {
            return true;
        }
        else {
            if (upgraderCount < 2) {
                return true;
            }
        }
        return false;
    };
    Builder.prototype.defineCreep = function (room) {
        return this.get_proto(300);
    };
    Builder.prototype.get_proto = function (energy) {
        return {
            body: [WORK, WORK, CARRY, MOVE],
            name: this.get_name(),
            memory: {
                role: this.role
            }
        };
    };
    Builder.prototype.create = function (hive) {
        var upgraderCount = Utils.get_role_count(hive.room, this.role);
        if (upgraderCount === 0) {
            return this.get_proto(300);
        }
        else {
            if (upgraderCount < 2) {
                return this.get_proto(300);
            }
        }
    };
    Builder.prototype.build_target = function (type) {
        // If we don't have conductors yet, we should mine our resources to help.
        return new _1.default.composite.MemSequence([
            new Actions.FindConstructionSite(type),
            new Actions.MoveToTarget(),
            new Actions.BuildTarget()
        ]);
    };
    Builder.prototype.setup = function () {
        var mineEnergy = new _1.default.decorator.Continue(new _1.default.composite.Sequence([
            new _1.default.decorator.Inverter(new Conditions.AlreadyFull()),
            new Conditions.WorkerEquals('conductor', 0),
            new Actions.FindSource(false),
            new Actions.HarvestSource()
        ]));
        return new _1.default.composite.MemSequence([
            // but if we have no energy, and have nothing to get it from, harvest some.
            mineEnergy,
            /// else build something
            new _1.default.composite.MemPriority([
                this.build_target(STRUCTURE_CONTAINER),
                this.build_target(STRUCTURE_EXTENSION),
                this.build_target(STRUCTURE_CONTROLLER),
                new _1.default.composite.MemSequence([
                    new Actions.FindTarget(STRUCTURE_CONTROLLER),
                    new Actions.MoveToTarget(),
                    new Actions.TransferTarget()
                ])
            ])
        ]);
    };
    return Builder;
}(Worker_1.Worker));
exports.Builder = Builder;
