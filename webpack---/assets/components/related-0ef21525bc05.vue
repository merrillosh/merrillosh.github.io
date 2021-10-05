var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.pageuris)?_c('section',{staticClass:"related"},[_c('h2',{staticClass:"title",domProps:{"innerHTML":_vm._s("Related projects")}}),_c('div',{staticClass:"projects"},_vm._l((_vm.pagesFromUris(_vm.pageuris)),function(page){return _c('projectcard',{key:page.uid,attrs:{"page":page}})}),1)]):_vm._e()}
var staticRenderFns = []

export { render, staticRenderFns }