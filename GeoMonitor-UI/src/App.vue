<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { LMap, LTileLayer, LMarker, LCircleMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import "leaflet/dist/leaflet.css";
import { fetchEarthquakeData } from './backend/fetchEarthquakeData'

const zoom = ref(4);
const center = ref<[number, number]>([40, 0]);
const apiTimeout: number = 60000;
const searchQuery = ref('');

let earthquakes = ref<any>([]);
let hasEarthquakes = ref(false);


async function updateEarthquakes() {
  earthquakes.value = await fetchEarthquakeData();

  let firstEarthquake = earthquakes.value[0];
  if (!hasEarthquakes.value && firstEarthquake) {
    center.value = [firstEarthquake.geometry.latitude, firstEarthquake.geometry.longitude];
    hasEarthquakes.value = true;
  }
}

  let filteredEarthquakes = computed(() => {
    if (searchQuery.value) {
      return earthquakes.value.filter((earthquake: any) =>
        earthquake.properties.place.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    return earthquakes.value;
  });

onMounted(() => {
  updateEarthquakes();
  setInterval(() => {
    updateEarthquakes();
  }, apiTimeout);
});

function zoomToEarthquake(lat: number, lng: number) {
  zoom.value = 8;
  center.value = [lat, lng];
}
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
          <p>Results ({{filteredEarthquakes.length}})</p>

          <input v-model="searchQuery" type="text" class="form-control form-control-sm mb-3" placeholder="Search by location..." />
        </div>
       <div class="earthquake-list-container">
        <div
          v-for="earthquake in filteredEarthquakes"
          :key="earthquake.id"
          class="card quake-card text-white mb-3"
          @click="zoomToEarthquake(earthquake.geometry.latitude, earthquake.geometry.longitude)"
        >
        <div class="magnitude">{{ earthquake.properties.mag.toFixed(1) }}</div>
        <div class="quake-info">
         <div class="location">{{ earthquake.properties.place }}</div>
         <div class="date">{{ earthquake.properties.convertedTime() }}</div>
        </div>
       </div>
     </div>
    </div> 

      <div class="col-md-8">
        <l-map
          v-if="earthquakes.length > 0" 
          ref="map" v-model:zoom="zoom" 
          v-model:center="center" 
          :useGlobalLeaflet="false" 
          style="height: 800px; width: 95%;">
          <l-tile-layer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
          <l-circle-marker v-for="earthquake in earthquakes" 
            :key="earthquake.id"
            :lat-lng=" [earthquake.geometry.latitude, earthquake.geometry.longitude]"
            :radius="4"
            :color="'#FFA63D'"
            :fillColor="'#FFA63D'"
            :fillOpacity="1"
            @click="zoomToEarthquake(earthquake.geometry.latitude, earthquake.geometry.longitude)">
          
            <l-popup>
              Lat: {{ earthquake.geometry.latitude }}<br>
              Long:{{ earthquake.geometry.longitude }}<br>
              Location: {{ earthquake.properties.place }}
           </l-popup>
          </l-circle-marker>
            
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
  display: flex;
  flex-direction: column;
  }

.sidebar-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #333;
  background-color: #0a0f1e;
}

.earthquake-list-container {
  flex: 1;
  overflow-y: auto;
  padding-top: 10px;
}

.sidebar-header h2 {
  color: #fff;
  padding-bottom: 0;
  margin-bottom: .5rem;
  font-size: 1.2rem
}

.sidebar-header p {
  font-size: 12px;
}

.quake-card {
  background-color: rgb(24, 24, 34);
  color: #fff;
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: start;
  padding: 12px;
  border-radius: 8px;
  border: none;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.quake-card:hover {
  background-color: #6e6e6e;
}

.magnitude {
  font-size: 1.6rem;
  font-weight: bold;
  color: #FFA63D;
  width: 50px;
  text-align: center;
  flex-shrink: 0;
}

.quake-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.location {
  font-weight: 500;

}

.date {
  font-size: 16px;
  font-weight: 200;
}

</style>
