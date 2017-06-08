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
var profiler = require('screeps-profiler');
var FindSource = (function (_super) {
    __extends(FindSource, _super);
    function FindSource(assignSource) {
        var _this = _super.call(this, 'FindSource') || this;
        _this.assignSource = assignSource || true;
        return _this;
    }
    FindSource.prototype.remember_source = function (creep, source_id, data) {
        // Cache of sources
        if (!creep.room.memory.sources) {
            creep.room.memory.sources = {};
        }
        if (!creep.room.memory.sources[source_id]) {
            var source = Game.getObjectById(source_id);
            if (!source)
                return {};
            creep.room.memory.sources[source_id] = {
                x: data.x,
                y: data.y,
                has_keeper: data.has_keeper,
                //active_miners: data.active_miners || 0,
                source_priority: data.source_priority || 0,
                harvester_count: data.harvester_count,
                active_miners: 0
                //assigned_miners: 0,
            };
        }
        return creep.room.memory.sources[source_id];
    };
    /**
     * Find sources with a lair next to them
     */
    FindSource.prototype.sources_with_lairs = function (creep) {
        var keeper_lairs = creep.room.find(FIND_STRUCTURES, { filter: function (s) { return s != undefined && s.structureType == STRUCTURE_KEEPER_LAIR; }
        });
        var sources_with_lairs = [];
        if (keeper_lairs.length > 0) {
            for (var _i = 0, keeper_lairs_1 = keeper_lairs; _i < keeper_lairs_1.length; _i++) {
                var lair = keeper_lairs_1[_i];
                var closest_source = lair.pos.findClosestByRange(FIND_SOURCES);
                sources_with_lairs.push(closest_source.id);
            }
        }
        return sources_with_lairs;
    };
    /*
     * Give us a metric for how hard it is to get there.
     * For every tile on path +2:normal, +1:swamp, +10:road
     */
    FindSource.prototype.determine_tick = function (source) {
        return 0;
    };
    /*
    * We need to termine how many creeps can mine a given source
    */
    FindSource.prototype.determine_maximum_miners = function (source) {
        // look at our 9x9 terrain
        var area_arr = _.filter(source.room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true), function (pos) { return pos.type == 'terrain'; });
        // count the number of spaces we can mine from
        var max_spots = 0;
        for (var _i = 0, area_arr_1 = area_arr; _i < area_arr_1.length; _i++) {
            var point = area_arr_1[_i];
            // plain, wall, swamp
            if (point.terrain == 'swamp' || point.terrain == 'plain') {
                max_spots++;
            }
        }
        // TODO: calculate the energy extration rate
        return max_spots;
    };
    /*
    * How much energy you can get per tick until regeneration
    */
    FindSource.prototype.source_priority = function (source) {
        var priority;
        if (source.ticksToRegeneration == undefined) {
            priority = 10;
        }
        else if (source.energy == 0) {
            priority = 0;
        }
        else {
            priority = source.energy / source.ticksToRegeneration;
        }
        if (priority > 0 && source.ticksToRegeneration < 150) {
            priority = priority * (1 + (150 - source.ticksToRegeneration) / 250);
            if (source.ticksToRegeneration < 70) {
                priority = priority + (70 - source.ticksToRegeneration) / 10;
            }
        }
        return priority;
    };
    FindSource.prototype.initialize_sources = function (creep) {
        creep.room.memory.total_sources = 0;
        var sources = creep.room.find(FIND_SOURCES);
        // we care about keeers
        var sources_with_lairs = this.sources_with_lairs(creep);
        // we also want to cache move weight (e.g. is there a swamp?)
        // determine the maximum number of people that can mine this source
        for (var source_index in sources) {
            var source = sources[source_index];
            if (source == null) {
                continue;
            }
            // avoid keepers, they're no fun
            var has_keeper = _.includes(sources_with_lairs, source.id);
            var sourceData = {
                x: source.pos.x,
                y: source.pos.y,
                //active_miners: 0,
                has_keeper: has_keeper,
                source_priority: this.source_priority(source),
                harvester_count: has_keeper ? 0 : this.determine_maximum_miners(source) // a hack since my reduction is buggy
            };
            this.remember_source(creep, source.id, sourceData);
            creep.room.memory.total_sources += 1;
        }
    };
    /*
    * Find best source and cache assignment
    */
    FindSource.prototype.find_best_source = function (creep) {
        var total_sources = creep.room.memory.total_sources;
        if (!total_sources) {
            this.initialize_sources(creep);
        }
        if (creep.memory.assigned_source) {
            //creep.room.memory.sources[creep.memory.assigned_source].active_miners += 1;
            return creep.memory.assigned_source;
        }
        var sources = creep.room.memory.sources;
        /*
         let best_id = Object.keys(sources).reduce((a:string, b:string) => {
         let msa = sources[a];
         let msb = sources[b];
         // caluclate range
         let arange = creep.pos.getRangeTo(msa.x, msa.y);
         let brange = creep.pos.getRangeTo(msb.x, msb.y);
         // weighted
         return (msa.active_miners * arange) < (msb.active_miners * brange) && msb.has_keeper == false ? a : b
         })
         */
        var best_id = Object.keys(sources).reduce(function (prev, curr) {
            var msa = sources[prev];
            var msb = sources[curr];
            if (msa.has_keeper)
                return curr;
            if (msb.has_keeper)
                return prev;
            //console.log('prev ', prev, ' ', msa, ' curr ', curr, ' ', msb)
            return msb.active_miners < msa.active_miners && msb.has_keeper == false ? curr : prev;
        });
        // add to active miners
        creep.room.memory.sources[best_id].active_miners += 1;
        //creep.room.memory.sources[best_id].assigned_miners += 1;
        if (this.assignSource) {
            creep.memory.assigned_source = best_id;
        }
        return best_id;
    };
    FindSource.prototype.tick = function (tick) {
        var creep = tick.target;
        //var sources = creep.room.find<Source>(FIND_SOURCES);
        //console.log('FindSourc.etick')
        var source = Game.getObjectById(this.find_best_source(creep));
        if (source && source.energy > 0) {
            creep.memory.source = source.id;
            return _1.default.State.SUCCESS;
        }
        return _1.default.State.FAILURE;
    };
    return FindSource;
}(basenode_1.default));
exports.FindSource = FindSource;
profiler.registerClass(FindSource, 'FindSource');
