import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class IsSpawnAvailable extends BaseNode {

  constructor() {
    super("IsSpawnAvailable");
  }

  public tick(tick: Tick): number {
    const room = tick.target as Room;
    const spawns = _.filter(room.find<Spawn>(FIND_MY_SPAWNS), (spawn: Spawn) => { return !spawn.spawning; });
    if (spawns.length > 0) {
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }
}
