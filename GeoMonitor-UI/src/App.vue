<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LMap, LTileLayer, LMarker, LCircleMarker } from '@vue-leaflet/vue-leaflet';
import "leaflet/dist/leaflet.css";
import { fetchEarthquakeData } from './backend/fetchEarthquakeData'

const zoom = ref(4);
const center = ref<[number, number]>([40, 0]);
const apiTimeout: number = 60000;

let earthquakes = ref<any>([]);

onMounted(async () => {
  earthquakes.value = await fetchEarthquakeData();
  
  let firstEarthquake = earthquakes.value[0];
  if (firstEarthquake) {
    center.value = [firstEarthquake.geometry.latitude, firstEarthquake.geometry.longitude];
  }

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

  <div class="container-fluid" style="margin: 30px">
    <div class="row">
      <div class="col-md-4 sidebar">
        <div class="sidebar-header">
          <h2>Recent Earthquakes</h2>
        </div>

        <div
          v-for="earthquake in earthquakes"
          :key="earthquake.id"
          class="card text-white mb-3"
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
          v-if="earthquakes.length > 0" 
          ref="map" v-model:zoom="zoom" 
          v-model:center="center" 
          :useGlobalLeaflet="false" 
          style="height: 800px; width: 100%;">
          <l-tile-layer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
            <l-circle-marker v-for="earthquake in earthquakes" 
            :key="earthquake.id"
            :lat-lng=" [earthquake.geometry.latitude, earthquake.geometry.longitude]"
            :radius="4"
            :color="'#FFA63D'"
            :fillColor="'#FFA63D'"
            :fill-opacity="1"/>                    
        </l-map>
      </div>
    </div>
  </div>
</template>

<style scoped>
 .sidebar {
  height: 800px;
  padding: 10px;
  overflow-y: auto;
  border: 2px solid rgb(33, 33, 52);
  border-radius: 8px;
  }

.sidebar-header h2 {
  color: white;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.2rem
}

.card {
  background-color:rgb(24, 24, 34);
  border: none;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.card:hover {
  background-color:rgb(26, 27, 48);

}

</style>
