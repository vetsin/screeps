
export class RoomState {
  room: Room;

  constructor(room: Room) {
    this.room = room;
    this.initialize();
  }

  private initialize() : void {
    if(!this.room.memory.sources) {
      this.room.memory.sources = {};
    }
    if(!this.room.memory.conductor) {
      this.room.memory.conductor = {};
    }
  }

  // Conductor Energy
  public earmark_energy(target_id: string, energy: number) : number {
    if(!this.room.memory.conductor[target_id]) {
      this.room.memory.conductor[target_id] = energy;
    } else {
      this.room.memory.conductor[target_id] += energy;
    }
    console.log('earmark_energy', target_id, this.room.memory.conductor[target_id]-energy,'+=',energy)
    return this.get_earmarked_energy(target_id);
  }

  public get_earmarked_energy(target_id: string) : number {
    if(this.room.memory.conductor[target_id])
      return this.room.memory.conductor[target_id];
    return 0;
  }

  public unmark_energy(target_id: string, energy: number) : number {

    console.log('unmark_energy', target_id, this.room.memory.conductor[target_id],'-=',energy)
    if(this.room.memory.conductor[target_id]) {
      this.room.memory.conductor[target_id] -= energy;

      if(this.room.memory.conductor[target_id] <= 0) {
        delete this.room.memory.conductor[target_id];
      }
    }
    return this.get_earmarked_energy(target_id);
  }

  // SOURCE
  public set_source(source_id: string, data: SourceData) : boolean {
    if(!this.room.memory.sources[source_id]) {
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
  }

  public get_source(source_id: string) : SourceData {
    return this.room.memory.sources[source_id];
  }
}
