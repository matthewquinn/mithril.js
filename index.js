"use strict"

var hyperscript = require("./hyperscript")
var mountRedraw = require("./mount-redraw")

var m = function m() { return hyperscript.apply(this, arguments) }
m.m = hyperscript
m.trust = hyperscript.trust
m.fragment = hyperscript.fragment
m.dom = hyperscript.dom
m.Fragment = "["
m.mount = mountRedraw.mount
m.render = require("./render")
m.redraw = mountRedraw.redraw
m.vnode = require("./render/vnode")
m.censor = require("./util/censor")
m.domFor = require("./render/domFor")

module.exports = m
