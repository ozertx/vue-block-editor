<template>
  <div>
    socket ffgfgfgfg {{ inputs }}
    <SvgRender 
:template=" 'circle' "
:params="{ cx: 100, cy: 100, radius: 100, color: '#B3344F'} "
     />
  </div>
</template>


<script lang="ts">

  export default {
    name: 'BaseSocket',

    // components:{ Socket },
    data() {
  
      return {
        inputs: {},
        outputs: {}
      }
    },
  }
</script>
