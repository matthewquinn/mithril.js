"use strict"

var Vnode = require("../render/vnode");

module.exports = function(attrs, els) {
	if (els == null)
		return Vnode("<", undefined, undefined, "", undefined, undefined)
	var children = []
	for (var i = 0; i < els.length; i++)
		children.push(
			Vnode(els[i].tagName, i, undefined, undefined, undefined, undefined)
		)
	var vnode = Vnode("!", attrs.key, undefined, children, undefined, undefined)
	vnode.els = els

	return vnode
}
