import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import * as Roles from './../roles';

export class SpawnCreep extends BaseNode {
  private role: string;

  constructor(role: string) {
    super('SpawnCreep');
    this.role = role.toLowerCase();
  }

  public tick(tick: Tick): number {
    const room = tick.target as Room;
    //const spawnId = tick.getReturn(this, "spawn");
    const spawnId = room.memory.spawn;
    if (spawnId) {
      const spawn = Game.getObjectById(spawnId) as Spawn;
      for (const role in Roles) {
        if (role.toLowerCase() === this.role) {
          const worker = new (Roles as any)[role]();
          const pc = worker.defineCreep(room);
          spawn.createCreep(pc.body, pc.name, pc.memory);
          return b3.State.SUCCESS;
        }
      }
    }
    return b3.State.FAILURE;
  }
}
