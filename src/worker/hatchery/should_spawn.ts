import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';
import * as Roles from "./../roles";

export class ShouldSpawn extends BaseNode {
  private role: string;

  constructor(role: string) {
    super("ShouldSpawn");
    this.role = role.toLowerCase();
  }

  public tick(tick: Tick): number {
    const room = tick.target as Room;
    for (const role in Roles) {
      if (role.toLocaleLowerCase() === this.role) {
        const worker = new (Roles as any)[role]();
        if (worker.shouldSpawn(room)) {
          return b3.State.SUCCESS;
        } else {
          break;
        }
      }
    }
    return b3.State.FAILURE;
  }
}
