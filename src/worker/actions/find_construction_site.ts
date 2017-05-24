import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';


export class FindConstructionSite extends BaseNode {
  target_type: string

  constructor(targetType: string, id?: number) {
    super('FindConstructionSite', id);
    this.target_type = targetType || STRUCTURE_STORAGE;
  }

  public tick(tick: Tick) : number {
    var creep = <Creep>tick.target;

    // just get the closest
    let target = creep.pos.findClosestByRange<ConstructionSite>(FIND_MY_CONSTRUCTION_SITES, {
      filter: (site: ConstructionSite) => { return site != undefined && site.structureType == this.target_type }
    });
    //console.log('FindConstructionSite.target', target, ' type ', this.target_type)

    if(!target)
      return b3.State.FAILURE;
    creep.memory.target = target.id;

    return b3.State.SUCCESS;
  }
}
