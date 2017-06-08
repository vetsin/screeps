import {createUUID} from './../../lib/b3/utils';
import {Worker} from './../Worker';
import {Hive} from './../../Hive';
import b3 from './../../lib/b3/';
import * as Actions from './../actions';
import * as Conditions from './../conditions';
import * as Utils from './../../components/utils';

export class Guard extends Worker {
    /*
    * Move energy around
    */
    constructor() {
      super('guard');
    }

    public shouldSpawn(room: Room): boolean {
      const guardCount = Utils.get_role_count(room, this.role);
      if (guardCount < 2) {
        return true;
      }
      return false;
    }
    public defineCreep(room: Room): protoCreep {
      return this.get_proto(300);
    }

    private get_proto(energy: number) : protoCreep {
      return <protoCreep>  {
        body: [TOUGH, RANGED_ATTACK, MOVE, ATTACK],
        name: this.get_name(),
        memory: {
          role: this.role
        }
      };
    }

    public create(hive: Hive) : protoCreep | undefined {
      let guard_count = Utils.get_role_count(hive.room, this.role);
      if(guard_count < 2) {
        return this.get_proto(300);
      }
    }

    public setup() : any {
      return new b3.composite.MemPriority([
        new b3.composite.MemSequence([
          new Actions.FindFlag('Hangout'),
          new Actions.MoveToTarget()
        ]),
      ])
    }
}
