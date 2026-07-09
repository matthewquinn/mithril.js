"use strict"

var Vnode = require("../render/vnode");

module.exports = function(fragment) {
	if (fragment == null)
		return Vnode("<", undefined, undefined, "", undefined, undefined)
	var children = []
	for (var i = 0; i < fragment.dom.length; i++)
		children.push(
			Vnode(fragment.dom[i].tagName.toLowerCase(), i, undefined, undefined, undefined, undefined)
		)
	var vnode = Vnode("!", undefined, undefined, children, undefined, undefined)
	vnode.els = fragment.dom;
	vnode.gkey = fragment.gkey;

	return vnode
}
