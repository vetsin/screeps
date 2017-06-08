import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class ChooseSpawn extends BaseNode {

  constructor() {
    super('ChooseSpawn');
  }

  public tick(tick: Tick): number {
    const room = tick.target as Room;
    const spawns = _.filter(room.find<Spawn>(FIND_MY_SPAWNS), (spawn: Spawn) => !spawn.spawning );
    if (spawns.length > 0) {
      const spawn: Spawn = spawns[0];
      room.memory.spawn = spawn.id;

      tick.setReturn(this, 'spawn', spawn.id);
      return b3.State.SUCCESS;
    }
    return b3.State.FAILURE;
  }
}
