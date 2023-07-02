<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" color="white"  density="compact">
      <v-avatar color="grey-darken-1" size="32"></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs centered color="grey-darken-2">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-1"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3" style="height: 100vh; width: 100vw;">
      <pan-zoom style="height: 100vh; width: 100vw;" >
        
        <v-container
            v-for="(item, index) in blocks" :key="index"
        >
          <v-card
            :style="{ position: 'absolute', left: item.x + 'px',  top: item.y + 'px' }"
            width="400"
            title="This is a title"
            subtitle="This is a subtitle"
            text="This is content"
          >
          {{ item }} - 
          {{ index }}
          </v-card>

        </v-container>


      </pan-zoom>

    </v-main>
  </v-app>
</template>

<script lang="ts">

  export default {
    data() { 
      console.log(this.$props)
      return {
      lineStart: null,
      lineEnd: null,
      blocks: this.$props.initBlocks,
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
      }
    },
    props: {
      initBlocks: Object 
    },
    methods: {
      onClick(e) {
        console.log(e)
        this.lineEnd = {
          x: e.clientX,
          y: e.clientY,
        };
      },
    }
  }

</script>