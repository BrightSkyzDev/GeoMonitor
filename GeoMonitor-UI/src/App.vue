<script setup lang="ts">
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import "leaflet/dist/leaflet.css";

const zoom = ref(4);
const center = ref<[number, number]>([40, 0]);


const earthquakes = ref([
  {
    id: 1,
    title: 'Earthquake 1',
    magnitude: 5.0,
    location: 'Location 1',
    date: '2023-10-01',
  },
  {
    id: 2,
    title: 'Earthquake 2',
    magnitude: 6.5,
    location: 'Location 2',
    date: '2023-10-02',
  },
  {
    id: 3,
    title: 'Earthquake 3',
    magnitude: 4.8,
    location: 'Location 3',
    date: '2023-10-03',
  },
]);
  
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
            <h5 class="card-title">{{ earthquake.title }}</h5>
            <p class="card-text">
              Magnitude: {{ earthquake.magnitude }}<br />
              Location: {{ earthquake.location }}<br />
              Date: {{ earthquake.date }}
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
