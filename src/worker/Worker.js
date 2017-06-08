"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../lib/b3/index");
var Conditions = require("./conditions");
var Worker = (function () {
    function Worker(role) {
        // this.name = creepName;
        this.role = role;
        this.currentID = 0;
    }
    Worker.prototype.construct_tree = function () {
        var workerRoot = new index_1.default.composite.MemSequence([
            new Conditions.CheckRole(this.role),
            this.setup()
        ]);
        this._set_ids(workerRoot);
        return workerRoot;
    };
    Worker.prototype.workerBody = function (workCount, carryCount, movecount) {
        var body = [];
        for (var i = 0; i < workCount; i++) {
            body.push(WORK);
        }
        for (var i = 0; i < carryCount; i++) {
            body.push(CARRY);
        }
        for (var i = 0; i < movecount; i++) {
            body.push(MOVE);
        }
        return body;
    };
    Worker.prototype.get_name = function () {
        var i = 0;
        while (Game.creeps[this.role + '_' + i] !== undefined) {
            i++;
        }
        return this.role + "_" + i;
    };
    Worker.prototype.createUUID = function () {
        return this.role + "_" + this.currentID++;
    };
    Worker.prototype._set_ids = function (node) {
        // Set all ID's in a deterministic manner unique to this worker
        node.set_id(this.createUUID());
        if (node.childs !== undefined) {
            var chillen = node.childs;
            for (var _i = 0, chillen_1 = chillen; _i < chillen_1.length; _i++) {
                var mn = chillen_1[_i];
                this._set_ids(mn);
            }
        }
    };
    return Worker;
}());
exports.Worker = Worker;
