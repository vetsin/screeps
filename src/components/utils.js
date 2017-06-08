"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Roles = require("./../worker/roles");
function find_role(room, role) {
    return room.find(FIND_MY_CREEPS, {
        filter: function (c) { return c.memory.role === role; }
    });
}
exports.find_role = find_role;
function get_role_count(room, role) {
    return this.find_role(room, role).length;
}
exports.get_role_count = get_role_count;
function map_creep_to_role(creepName) {
    var mrole = creepName.split('_')[0];
    for (var role in Roles) {
        if (role.toLowerCase() === mrole) {
            return Roles[role];
        }
    }
    return undefined;
}
exports.map_creep_to_role = map_creep_to_role;
