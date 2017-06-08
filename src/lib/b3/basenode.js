"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./constants/state");
var BaseNode = (function () {
    function BaseNode(name) {
        this.id = name;
        // this.debug_creep_name = 'builder_0';
    }
    BaseNode.prototype.set_id = function (id) {
        this.id = this.id + "_" + id;
        return this.id;
    };
    BaseNode.prototype.execute = function (tick) {
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
        var status = this._tick(tick);
        // if state is different than RUNNING trigger close
        if (status !== state_1.default.RUNNING) {
            if (this._should_debug(tick)) {
                global.log.debug(this.id, "._close", status);
            }
            this._close(tick);
        }
        // EXIT
        this._exit(tick);
        return status;
    };
    BaseNode.prototype._enter = function (tick) {
        tick.enterNode(this);
        this.enter(tick);
    };
    BaseNode.prototype._open = function (tick) {
        tick.openNode(this);
        tick.blackboard.set("isOpen", true, tick.tree.id, this.id);
        this.open(tick);
    };
    BaseNode.prototype._tick = function (tick) {
        tick.tickNode(this);
        try {
            return this.tick(tick);
        }
        catch (e) {
            global.log.error(e);
            return state_1.default.ERROR;
        }
    };
    BaseNode.prototype._close = function (tick) {
        tick.closeNode(this);
        tick.blackboard.set("isOpen", false, tick.tree.id, this.id);
        this.close(tick);
    };
    BaseNode.prototype._exit = function (tick) {
        tick.exitNode(this);
        this.exit(tick);
    };
    // to be extended
    BaseNode.prototype.enter = function (tick) { };
    BaseNode.prototype.open = function (tick) { };
    BaseNode.prototype.close = function (tick) { };
    BaseNode.prototype.exit = function (tick) { };
    BaseNode.prototype._should_debug = function (tick) {
        if (this.debug_creep_name) {
            if (tick.target instanceof Creep) {
                return tick.target.name === this.debug_creep_name;
            }
        }
        return false;
    };
    return BaseNode;
}());
exports.default = BaseNode;
