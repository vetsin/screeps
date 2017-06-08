"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module utils
 */
var currentUUID = 0;
/**
 * Generate unique Number sequentially.
 *
 * @class Utils
 * @method  createUUID
 * @return {Number} A unique Number.
 */
function createUUID() {
    return currentUUID++;
}
exports.createUUID = createUUID;
