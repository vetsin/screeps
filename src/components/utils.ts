import * as Roles from './../worker/roles';

export function find_role(room: Room, role: string): Creep[] {
  return room.find<Creep>(FIND_MY_CREEPS, {
    filter: (c: Creep) => c.memory.role === role
  });
}

export function get_role_count(room: Room, role: string): number {
  return this.find_role(room, role).length;
}

export function map_creep_to_role(creepName: string): Worker | undefined {
  const mrole = creepName.split('_')[0];

  for (const role in Roles) {
    if (role.toLowerCase() === mrole) {
      return (Roles as any)[role];
    }
  }
  return undefined;
}
