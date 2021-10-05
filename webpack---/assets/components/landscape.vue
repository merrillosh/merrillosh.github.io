var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"landscape"},[_c('figure',{class:{"hide": !_vm.show, "show": _vm.show, "content": true}},[(_vm.block.content.type == "video")?_c('player',{attrs:{"src":_vm.kirby.page.files[_vm.block.content.image].src}}):_vm._e(),(_vm.block.content.srcset)?_c('imageloader',{attrs:{"srcset":_vm.block.content.srcset,"sizes":"100vw"}}):_vm._e()],1)])}
var staticRenderFns = []

export { render, staticRenderFns }