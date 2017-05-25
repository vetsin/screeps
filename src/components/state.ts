
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
  public earmark_energy(target_id: string, energy: number | undefined) : number {
    energy = energy || 0
    if(!this.room.memory.conductor[target_id]) {
      this.room.memory.conductor[target_id] = energy;
    } else {
      this.room.memory.conductor[target_id] += energy;
    }
    this.debug_earmark(target_id, energy, 'Earmarked');
    return this.get_earmarked_energy(target_id);
  }

  private debug_earmark(target_id: string, energy: number, action: string) {
    // DEBUGGING
    let currently_marked = this.get_earmarked_energy(target_id);
    let obj = Game.getObjectById(target_id)
    var target_energy = 0;
    if(obj instanceof StructureContainer) {
      target_energy = (obj as StructureContainer).store.energy
    } else if (obj instanceof Resource) {
      target_energy = (obj as Resource).amount;
    }
    let percent = currently_marked / target_energy;
    let fill_count = percent > 1 ? 5 : Math.floor(5 * percent);
    let empty_count = 5 - fill_count;
    global.log.debug(`${action} [${'|'.repeat(fill_count)}${'_'.repeat(empty_count)}] (${energy})(${currently_marked}/${target_energy} - ${percent*100}%) claimed`);
  }

  public get_earmarked_energy(target_id: string) : number {
    if(this.room.memory.conductor[target_id])
      return this.room.memory.conductor[target_id];
    return 0;
  }

  public unmark_energy(target_id: string, energy: number | undefined) : number {
    energy = energy || 0;
    if(this.room.memory.conductor[target_id]) {
      this.room.memory.conductor[target_id] -= energy;

      if(this.room.memory.conductor[target_id] <= 0) {
        delete this.room.memory.conductor[target_id];
      }
    }
    this.debug_earmark(target_id, energy, 'Unmarked');
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
