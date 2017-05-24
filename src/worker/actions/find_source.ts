import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

const profiler = require('screeps-profiler');

export class FindSource extends BaseNode {
  name: string;

  constructor() {
    super('FindSource');
  }

  private remember_source(creep: Creep, source_id: string, data: SourceData) : any {

    // Cache of sources
    if(!creep.room.memory.sources) {
      creep.room.memory.sources = {};
    }
    if(!creep.room.memory.sources[source_id]) {
      let source = Game.getObjectById<Source>(source_id);
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
  }

  /**
   * Find sources with a lair next to them
   */
  private sources_with_lairs(creep: Creep) : string[] {
    let keeper_lairs = creep.room.find<StructureKeeperLair>(FIND_STRUCTURES, { filter:
      (s: Structure) => { return s.structureType ==  STRUCTURE_KEEPER_LAIR}
    });
    let sources_with_lairs = [];
    if(keeper_lairs.length > 0) {
      for(let lair of keeper_lairs) {
        let closest_source = lair.pos.findClosestByRange<Source>(FIND_SOURCES);
        sources_with_lairs.push(closest_source.id);
      }
    }
    return sources_with_lairs
  }

  /*
   * Give us a metric for how hard it is to get there.
   * For every tile on path +2:normal, +1:swamp, +10:road
   */
  private determine_tick(source: Source) : number {
    return 0;
  }

  /*
  * We need to termine how many creeps can mine a given source
  */
  private determine_maximum_miners(source: Source) : number {
    // look at our 9x9 terrain
    let area_arr = _.filter(<LookAtResultWithPos[]>source.room.lookAtArea(source.pos.y - 1,
                source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true),
                (pos:LookAtResultWithPos) => { return pos.type == 'terrain' }
              );
    // count the number of spaces we can mine from
    var max_spots = 0;
    for(let point of area_arr) {
      // plain, wall, swamp
      if(point.terrain == 'swamp' || point.terrain == 'plain') {
        max_spots++;
      }
    }
    // TODO: calculate the energy extration rate
    return max_spots;
  }

  /*
  * How much energy you can get per tick until regeneration
  */
  private source_priority(source: Source) {
    let priority: number;
    if(source.ticksToRegeneration == undefined) {
      priority = 10;
    } else if (source.energy == 0) {
      priority = 0;
    } else {
      priority = source.energy / source.ticksToRegeneration;
    }
    if (priority > 0 && source.ticksToRegeneration < 150) {
        priority = priority * (1 + (150 - source.ticksToRegeneration)/250);
        if (source.ticksToRegeneration < 70) {
            priority = priority + (70 - source.ticksToRegeneration)/10;
        }
    }
    return priority;
  }

  private initialize_sources(creep: Creep) : void {
    creep.room.memory.total_sources = 0;
    let sources = creep.room.find<Source>(FIND_SOURCES);
    // we care about keeers
    let sources_with_lairs = this.sources_with_lairs(creep);
    // we also want to cache move weight (e.g. is there a swamp?)

    // determine the maximum number of people that can mine this source

    for(let source_index in sources) {
      let source = sources[source_index];
      if (source == null) {
        continue;
      }
      // avoid keepers, they're no fun
      let has_keeper = _.includes(sources_with_lairs, source.id);

      let sourceData = <SourceData>{
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
  }

  /*
  * Find best source and cache assignment
  */
  private find_best_source(creep: Creep) : string {
    let total_sources = creep.room.memory.total_sources;
    if(!total_sources) {
      this.initialize_sources(creep);
    }
    if(creep.memory.assigned_source) {
      //creep.room.memory.sources[creep.memory.assigned_source].active_miners += 1;
      return creep.memory.assigned_source;
    }
    let sources = creep.room.memory.sources;
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
    let best_id = Object.keys(sources).reduce((prev:string, curr:string) => {
      let msa = sources[prev];
      let msb = sources[curr];
      if(msa.has_keeper)
        return curr
      if(msb.has_keeper)
        return prev
      //console.log('prev ', prev, ' ', msa, ' curr ', curr, ' ', msb)
      return msb.active_miners < msa.active_miners && msb.has_keeper == false ? curr : prev;
    });

    // add to active miners
    creep.room.memory.sources[best_id].active_miners += 1;
    //creep.room.memory.sources[best_id].assigned_miners += 1;
    creep.memory.assigned_source = best_id;
    return best_id;
  }

  public tick(tick: Tick) : number {
    let creep = <Creep>tick.target;
    //var sources = creep.room.find<Source>(FIND_SOURCES);
    //console.log('FindSourc.etick')

    let source = Game.getObjectById<Source>(this.find_best_source(creep));
    if(source && source.energy > 0) {
      creep.memory.source = source.id;
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }

}
profiler.registerClass(FindSource, 'FindSource');
