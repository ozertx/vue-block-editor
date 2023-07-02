<template>
  <div>
!22

      <div v-for="(input,id) in inputs" :key="id" >
        <BaseSocket/>
      </div>
      <div v-for="(output,id) in outputs" :key="id"> 
        <BaseSocket/>
      </div>
      
22

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