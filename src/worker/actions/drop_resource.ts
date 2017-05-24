import BaseNode from './../../lib/b3/basenode';
import Tick from './../../lib/b3/tick';
import b3 from './../../lib/b3/';

export class DropResource extends BaseNode {
  name: string;
  resource: string;

  constructor(resource?: string) {
    super('DropResource');
    this.resource = resource || RESOURCE_ENERGY;
  }

  public tick(tick: Tick) : number {
    //console.log('FindTarget.tick')
    var creep = <Creep>tick.target;
    creep.drop(this.resource);
    return b3.State.SUCCESS;
  }
}
