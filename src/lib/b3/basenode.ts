import State from './constants/state';
import Tick from './tick';

export default abstract class BaseNode {
  id: string;
  private debugCreepName: string;

  constructor(name: string) {
    this.id = name;
    // this.debug_creep_name = 'builder_0';
  }

  public set_id(id: string): string {
    this.id = `${this.id}_${id}`;
    return this.id;
  }

  public execute(tick: Tick): number {
    // ENTER
    if (this._should_debug(tick)) {
      global.log.debug(this.id, "._enter");
    }
    this._enter(tick);

    // trigger open if not opened
    if (!tick.blackboard.get("isOpen", tick.tree.id, this.id)) {
      this._open(tick);
    }

    // tick node and get status
    if (this._should_debug(tick)) {
      global.log.debug(this.id, "._tick");
    }
    const status = this._tick(tick);

    // if state is different than RUNNING trigger close
    if (status !== State.RUNNING) {
      if (this._should_debug(tick)) {
        global.log.debug(this.id, "._close", status);
      }
      this._close(tick);
    }

    // EXIT
    this._exit(tick);

    return status;
  }

  public _enter(tick: Tick): void {
    tick.enterNode(this);
    this.enter(tick);
  }

  public _open(tick: Tick): void {
    tick.openNode(this);
    tick.blackboard.set("isOpen", true, tick.tree.id, this.id);
    this.open(tick);
  }

  public _tick(tick: Tick): number {
    tick.tickNode(this);
    try {
      return this.tick(tick);
    } catch (e) {
      global.log.error(e);
      return State.ERROR;
    }

  }

  public _close(tick: Tick): void {
    tick.closeNode(this);
    tick.blackboard.set("isOpen", false, tick.tree.id, this.id);
    this.close(tick);
  }

  public _exit(tick: Tick) {
    tick.exitNode(this);
    this.exit(tick);
  }
  // to be extended
  public enter(tick: Tick): void {}
  public open(tick: Tick): void {}
  public abstract tick(tick: Tick): number;
  public close(tick: Tick): void {}
  public exit(tick: Tick): void {}

  private _should_debug(tick: Tick): boolean {
    return tick.target.name === this.debugCreepName;
  }
}
