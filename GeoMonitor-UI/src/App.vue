<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import "leaflet/dist/leaflet.css";
import { fetchEarthquakeData } from './backend/fetchEarthquakeData'

const zoom = ref(4);
const center = ref<[number, number]>([40, 0]);

const apiTimeout: number = 60000;


const earthquakes = ref<any>([]);

onMounted(async () => {
  earthquakes.value = await fetchEarthquakeData();;
});


  
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">GeoMonitor</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Map</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid" style="margin-top: 30px">
    <div class="row">
      <div class="col-md-4">
        <div class="sidebar-header">
          <h2>Recent Earthquakes</h2>
        </div>

        <div
          v-for="earthquake in earthquakes"
          :key="earthquake.id"
          class="card bg-dark text-white mb-3"
        >
          <div class="card-body">
            <h5 class="card-title">{{ earthquake.properties.title }}</h5>
            <p class="card-text">
              Magnitude: {{ earthquake.properties.mag }}<br />
              Location: {{ earthquake.properties.place }}<br />
              Date: {{ earthquake.properties.convertedTime() }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <l-map
          ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false" style="height: 500px; width: 100%;">
          <l-tile-layer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
             </l-tile-layer>
        </l-map>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
