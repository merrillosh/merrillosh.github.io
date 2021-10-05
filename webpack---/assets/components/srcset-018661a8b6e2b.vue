<template>
  <imageloader scr='empty.gif' :srcset='srcset(file)' :sizes='sizes' />
</template>

<script>
module.exports = {
  props: ['file','sizes'],
  methods: {
    srcset(file) {
      if(file.thumbnails){
        var srcarray = [];
        var sizes = [];
        Object.keys(file.thumbnails).forEach((id) => {
          srcarray.push( file.thumbnails[id] + ' ' + id.replace('w','')+'w');
          sizes.push('(max-width: '+id.replace('w','') + 'px) '+id.replace('w','')+'px');
        });
        return srcarray.join(', ')
      }
    }
  }
}
</script>
