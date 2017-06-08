"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var factory_creep_1 = require("../mock/factory.creep");
//import map_role from "../../src/worker/Mapper";
describe("worker construct", function () {
    var creepFactory = new factory_creep_1.CreepFactory()
        .body([WORK, WORK, CARRY, MOVE])
        .carrying(RESOURCE_ENERGY, 50)
        .name('harvester_0')
        .memory({ role: 'harvester' });
    before(function () {
        // runs before all tests in this block
    });
    beforeEach(function () {
        // runs before each test in this block
    });
    it("can construct role", function () {
        var creep = creepFactory.build();
        //let role = map_role(creep.name);
        chai_1.assert.isNotNull(null);
    });
});
