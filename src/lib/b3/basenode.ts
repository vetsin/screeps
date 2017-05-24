
import {createUUID} from './utils';
import State from './constants/state';
import NodeGetter from './node_getter';
import Tick from './tick';

export default abstract class BaseNode {
  //id: string;
  name: string;
  //description: string;
  //parameters: {};
  //properties: {};

  constructor(name: string, id?: number) {
    this.name = name;
    if(id)
      this.name = this.name + id;
    //NodeGetter.set(this.name, this);
    //this.description = '';
    //this.parameters = {};
    //this.properties = {};
  }

  protected generate_id() : string {
    return this.name;
  }

  public execute(tick : Tick) {
    // ENTER
    this._enter(tick);

    // trigger open if not opened
    if (!tick.blackboard.get('isOpen', tick.tree.id, this.generate_id())) {
      this._open(tick);
    }

    // tick node and get status
    var status = this._tick(tick);
    //global.log.debug(status);
    // if state is different than RUNNING trigger close
    if (status !== State.RUNNING) {
      this._close(tick);
    }

    // EXIT
    this._exit(tick);

    return status;
  }

  public _enter(tick: Tick) : void {
    tick.enterNode(this);
    this.enter(tick);
  }

  public _open(tick: Tick) : void {
    tick.openNode(this);
    tick.blackboard.set('isOpen', true, tick.tree.id, this.generate_id());
    this.open(tick);
  }

  public _tick(tick: Tick) : number {
    tick.tickNode(this);
    try {
      return this.tick(tick);
    } catch (e) {
      global.log.error(e);
      return State.ERROR;
    }

  }

  public _close(tick: Tick) : void {
    tick.closeNode(this);
    tick.blackboard.set('isOpen', false, tick.tree.id, this.generate_id());
    this.close(tick);
  }

  public _exit(tick: Tick) {
    tick.exitNode(this);
    this.exit(tick);
  }
  // to be extended
  public enter(tick: Tick) : void {}
  public open(tick: Tick) : void {}
  public abstract tick(tick: Tick) : number
  public close(tick: Tick) : void {}
  public exit(tick: Tick) : void {}
}
