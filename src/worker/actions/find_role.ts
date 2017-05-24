import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';


export class FindRole extends BaseNode {
  name: string;
  role: string

  constructor(role: string, id?: number) {
    super('FindRole', id);
    this.role = role
  }

  public tick(tick: Tick) : number {
    //console.log('FindTarget.tick')
    var creep = <Creep>tick.target;
    // just get the closest
    let target = creep.pos.findClosestByRange<Creep>(FIND_MY_CREEPS, {
      filter: (c: Creep) => { return c.memory.role == this.role && _.sum(c.carry) < c.carryCapacity }
    });
    console.log('findrole ', this.role, target)
    if(!target)
      return b3.State.FAILURE;
    creep.memory.target = target.id;

    return b3.State.SUCCESS;
  }
}
