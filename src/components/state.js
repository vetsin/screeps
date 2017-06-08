"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoomState = (function () {
    function RoomState(room) {
        this.room = room;
        this.initialize();
    }
    RoomState.prototype.initialize = function () {
        if (!this.room.memory.sources) {
            this.room.memory.sources = {};
        }
        if (!this.room.memory.conductor) {
            this.room.memory.conductor = {};
        }
    };
    // Conductor Energy
    RoomState.prototype.earmark_energy = function (target_id, energy) {
        energy = energy || 0;
        if (!this.room.memory.conductor[target_id]) {
            this.room.memory.conductor[target_id] = energy;
        }
        else {
            this.room.memory.conductor[target_id] += energy;
        }
        this.debug_earmark(target_id, energy, 'Earmarked');
        return this.get_earmarked_energy(target_id);
    };
    RoomState.prototype.debug_earmark = function (target_id, energy, action) {
        // DEBUGGING
        var currently_marked = this.get_earmarked_energy(target_id);
        var obj = Game.getObjectById(target_id);
        var target_energy = 0;
        if (obj instanceof StructureContainer) {
            target_energy = obj.store.energy;
        }
        else if (obj instanceof Resource) {
            target_energy = obj.amount;
        }
        var percent = currently_marked / target_energy;
        var fill_count = percent > 1 ? 5 : Math.floor(5 * percent);
        var empty_count = 5 - fill_count;
        global.log.debug(action + " [" + '|'.repeat(fill_count) + '_'.repeat(empty_count) + "] (" + energy + ")(" + currently_marked + "/" + target_energy + " - " + percent * 100 + "%) claimed");
    };
    RoomState.prototype.get_earmarked_energy = function (target_id) {
        if (this.room.memory.conductor[target_id])
            return this.room.memory.conductor[target_id];
        return 0;
    };
    RoomState.prototype.unmark_energy = function (target_id, energy) {
        energy = energy || 0;
        if (this.room.memory.conductor[target_id]) {
            this.room.memory.conductor[target_id] -= energy;
            if (this.room.memory.conductor[target_id] <= 0) {
                delete this.room.memory.conductor[target_id];
            }
        }
        this.debug_earmark(target_id, energy, 'Unmarked');
        return this.get_earmarked_energy(target_id);
    };
    // SOURCE
    RoomState.prototype.set_source = function (source_id, data) {
        if (!this.room.memory.sources[source_id]) {
            this.room.memory.sources[source_id] = {
                x: data.x,
                y: data.y,
                has_keeper: data.has_keeper,
                source_priority: data.source_priority || 0,
                harvester_count: data.harvester_count,
                active_miners: 0
            };
            return true;
        }
        return false;
    };
    RoomState.prototype.get_source = function (source_id) {
        return this.room.memory.sources[source_id];
    };
    return RoomState;
}());
exports.RoomState = RoomState;
