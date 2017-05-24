
/*
interface Memory {
  uuid: number;
  log: any;
}
*/
interface Step {
  x: number;
  y: number;
  dx: number;
  dy: number;
  direction: number;
}

interface Path {
  steps: Step[];
}

interface SourceData {
  x: number;
  y: number;
  has_keeper: boolean;
  //active_miners: number;
  source_priority: number;
  harvester_count: number;
}

interface protoCreep {
    body: string[];
    name: any;
    memory: any;
}

/*
interface Game {
    cache: {
        assignments: { [ref: string]: { [roleName: string]: string[] } };
        targets: { [ref: string]: string[] };
        structures: { [roomName: string]: { [structureType: string]: Structure[] } };
        constructionSites: { [roomName: string]: ConstructionSite[] };
    }
}
*/

declare const __REVISION__: string;
