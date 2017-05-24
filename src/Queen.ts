// manages Hive-scale operations
import {Hive} from "./Hive";
import {Hivemind} from "./Hivemind";

export default class Queen {
  Hives: { [roomName: string]: Hive };
  Hiveminds: { [roomName: string]: Hivemind };

  constructor() {
    this.Hives = {};
    this.Hiveminds = {};
  }

  initialize(): void {

    for (let name in Game.rooms) {
      this.Hives[name] = new Hive(name);
    }

    for (let name in this.Hives) {
      this.Hiveminds[name] = new Hivemind(this.Hives[name]);
    }

  }

}
