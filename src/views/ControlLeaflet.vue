<template>
  <div ref="mapContainer" style="height: 100vh;"></div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'LeafletMap',
  props: {
    center: {
      type: Array,
      default: () => [51.505, -0.09],
    },
    zoom: {
      type: Number,
      default: 13,
    },
  },
  mounted() {
    this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    // Добавьте обработчики событий для реализации функционала создания и соединения блоков на карте
  },
  beforeDestroy() {
    this.map.remove();
  },
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
