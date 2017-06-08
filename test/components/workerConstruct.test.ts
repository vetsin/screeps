import {assert} from "chai";
import {CreepFactory} from "../mock/factory.creep";
//import map_role from "../../src/worker/Mapper";

describe("worker construct", () => {

  const creepFactory = new CreepFactory()
    .body([WORK, WORK, CARRY, MOVE])
    .carrying(RESOURCE_ENERGY, 50)
    .name('harvester_0')
    .memory({role: 'harvester'});

  before(() => {
    // runs before all tests in this block
  });

  beforeEach(() => {
    // runs before each test in this block
  });

  it("can construct role", () => {
    const creep = creepFactory.build();
    //let role = map_role(creep.name);
    assert.isNotNull(null);
  });

});
