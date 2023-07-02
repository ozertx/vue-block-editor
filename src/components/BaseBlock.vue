<template>
  <div>
      <div v-for="(input,id) in inputs" :key="id" >
        <BaseSocket style="margin-left:-24px;"/>
      </div>
      <div v-for="(output,id) in outputs" :key="id"> 
        <BaseSocket  style="margin-right:-24px;"/>
      </div>
      
  </div>
</template>

<script lang="ts">
 
  import { createApp, defineComponent } from 'vue'

  const cmpDefinition = defineComponent({
    name: 'BaseBlock',
    props:  [ ],
    components: { 
    },
    mounted() {
      console.log(this.$props)
    },
    data() {
      return {
        inputs: {
          socket1: {}
        },
        outputs: {}
      }
    },
    methods: {
    }
  })


  export default cmpDefinition

</script>

<style  lang="sass">
</style>