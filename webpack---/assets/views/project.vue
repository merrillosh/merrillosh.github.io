var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.kirby.page.template == "default" || _vm.kirby.page.template == "work")?_c('main',{attrs:{"id":"Project"}},[_vm._l((_vm.kirby.page.content.features.features),function(block,index){return _c('block',{key:block.id,attrs:{"index":index},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var show = ref.show;
return [(block.type == "folio")?_c('folio',{attrs:{"block":block,"show":show}}):_vm._e(),(block.type == "landscape")?_c('landscape',{attrs:{"block":block,"show":show}}):_vm._e()]}}],null,true)})}),(_vm.kirby.page.content.related)?_c('related',{attrs:{"pageuris":_vm.yaml(_vm.kirby.page.content.related.value)}}):_vm._e(),_c('footerbar')],2):_vm._e()}
var staticRenderFns = []

export { render, staticRenderFns }