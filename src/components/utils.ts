/*
* Give us a metric for how hard it is to get there.
* For every tile on path +2:normal, +1:swamp, +10:road
*/
export function determine_tick(path: Path) : number {
  return 0;
}

export function find_role(room: Room, role: string) : Creep[] {
  return room.find<Creep>(FIND_MY_CREEPS, {
    filter: (c: Creep) => { return c.memory.role == role}
  });
}

export function get_role_count(room: Room, role: string) : number {
  return this.find_role(room, role).length;
}
