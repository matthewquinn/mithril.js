"use strict"

var Vnode = require("../render/vnode")

module.exports = function(render, schedule, console) {
	var subscriptions = []
	var pending = false
	var offset = -1
	var uniqueDOM = new Map();

	function sync() {
		for (const [key, value] of uniqueDOM.entries()) {
			value.used = false;
		}
		for (offset = 0; offset < subscriptions.length; offset += 2) {
			try { render(subscriptions[offset], Vnode(subscriptions[offset + 1]), redraw, uniqueDOM) }
			catch (e) { console.error(e) }
		}
		offset = -1
		for (const [key, value] of uniqueDOM.entries()) {
			if (!value.used) {
				for (let i = 0; i < value.els.length; i++) {
					value.els[i].remove();
				}
			}

			uniqueDOM.delete(key);
		}
	}

	function redraw() {
		if (!pending) {
			pending = true
			schedule(function() {
				pending = false
				sync()
			})
		}
	}

	redraw.sync = sync

	function mount(root, component) {
		if (component != null && component.view == null && typeof component !== "function") {
			throw new TypeError("m.mount expects a component, not a vnode.")
		}

		var index = subscriptions.indexOf(root)
		if (index >= 0) {
			subscriptions.splice(index, 2)
			if (index <= offset) offset -= 2
			render(root, [])
		}

		if (component != null) {
			subscriptions.push(root, component)
			render(root, Vnode(component), redraw, uniqueDOM)
		}
	}

	return {mount: mount, redraw: redraw}
}
