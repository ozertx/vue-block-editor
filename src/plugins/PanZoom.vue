
<template>
  <div ref="panzoomContainer" :class="['vue-pan-zoom-item-' + this.instanceId]">
      <div ref="panzoom" @mousedown="onMouseDown" @mouseup="onMouseUp">
   - {{ pan }}  -{{ zoom }} -
          <slot></slot>
      </div>
  </div>
</template>

<script lang="ts">
  import panZoom from 'panzoom';
  export default {
    name: 'panZoom',
    props: {
      options: Object,
      selector: String,
    },
    data() {
      this.$panZoomInstance = null
      this.instanceId = null
      return {
        pan: { x: 0, y: 0 },
        zoom: 1,
        defaultOptions: {
          autocenter: true,
          bounds: true,
          transformOrigin: {
            x: 0.5,
            y: 0.5,
          }
        }
      }
    },
    created() {
      this.instanceId = this.generateRandomId(20);
    },
    mounted() {
      if (this.scene) {
        var _options = Object.assign({}, this.defaultOptions, this.options);
        this.$panZoomInstance = panZoom(this.scene, _options);
        this.$panZoomInstanceId = this.instanceId;
        this.attachEvents();
      }
    },
    computed: {
      scene() {
        var el = this.$refs['panzoom'];;
        // var _wrapper = this.$el.querySelector('.vue-pan-zoom-scene');
        // var _wrapper = this.$refs['vue-pan-zoom-scene'];
        // if (this.selector) {
        //   el = _wrapper.querySelector(this.selector);
        // }
        // else {
        //   el = _wrapper.querySelector('svg, object, embed');
        //   if (!el) {
        //     el = _wrapper.firstChild;
        //   }
        // }
        console.log(el);
        
        return el;
      },
    },
    methods: {

      onMouseDown(event) {
        // Get the click coordinates relative to the panzoom container
        const containerRect = this.$refs['panzoomContainer'].getBoundingClientRect();
        this.clickX = event.clientX - containerRect.left;
        this.clickY = event.clientY - containerRect.top;
      },
      onMouseUp(event) {
        // Get the release coordinates relative to the panzoom container
        const containerRect = this.$refs['panzoom'].getBoundingClientRect();
        const releaseX = event.clientX - containerRect.left;
        const releaseY = event.clientY - containerRect.top;

        // Get the current pan and zoom values
        const transform = this.$panZoomInstance.getTransform()
        console.log(transform)
        const pan = transform
        const zoom = transform.scale

        // Calculate the click and release coordinates in the panzoom coordinate system
        const clickInPanzoom = {
          x: (this.clickX - pan.x) / zoom,
          y: (this.clickY - pan.y) / zoom,
        };
        const releaseInPanzoom = {
          x: (releaseX - pan.x) / zoom,
          y: (releaseY - pan.y) / zoom,
        };

        // Do something with the coordinates
        console.log(`Clicked at (${clickInPanzoom.x}, ${clickInPanzoom.y})`);
        console.log(`Released at (${releaseInPanzoom.x}, ${releaseInPanzoom.y})`);
      },
    
      generateRandomId(l) {
        l = l || 16;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charsLength = chars.length;
        var a = [];

        for(var i=0; i<l; i++) {
          a.push( chars.charAt(Math.floor(Math.random() * charsLength)) );
        }
        return a.join('');
      },
      attachEvents() {
        this.$emit('init', this.$panZoomInstance, this.$panZoomInstanceId);

        this.$panZoomInstance.on('panstart', (e) => {
          this.$emit('panstart', e);
        });

        this.$panZoomInstance.on('panend', (e) => {
          this.$emit('panend', e);
        });

        this.$panZoomInstance.on('pan', (e) => {
          this.$emit('pan', e);
          this.pan = e.getTransform().translate;
          this.zoom = e.getTransform().scale;
        });

        this.$panZoomInstance.on('zoom', (e) => {
          this.$emit('zoom', e);
        });

        this.$panZoomInstance.on('transform', (e) => {
          this.$emit('transform', e);
        });

        this.$panZoomInstance.on('zoomend', (e) => {
          this.$emit('zoomend', e);
        });
      },
      isPaused() {
        return this.$panZoomInstance.isPaused();
      },
      pause() {
        this.$panZoomInstance.pause();
      },
      resume() {
        this.$panZoomInstance.resume();
      }
    }
  }
</script>
