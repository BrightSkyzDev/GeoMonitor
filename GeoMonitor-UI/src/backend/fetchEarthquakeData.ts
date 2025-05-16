import {Properties} from "./Properties"
import {Geometry} from "./Geometry"

async function getData() {
    const response = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`)
    const data = await response.json();
    return data;
}

export async function fetchEarthquakeData() {
    const pollData = await getData();

    let earthquakes: any[] = [];

    pollData.features.forEach((feature: any) => {

        let mag: number = feature.properties.mag;
        let place: string = feature.properties.place;
        let time: number = feature.properties.time;
        let propertiesType: string = feature.properties.type;
        let sig: number = feature.properties.sig;

        let quakeProps: Properties = new Properties(mag, place, time, propertiesType, sig);


        let geometryType = feature.geometry.type;
        let longitude = feature.geometry.coordinates[0];
        let latitude = feature.geometry.coordinates[1];
        let depth = feature.geometry.coordinates[2];

        const quakeGeo = new Geometry(geometryType, longitude, latitude, depth); 

        earthquakes.push({
            properties: quakeProps,
            geometry: quakeGeo
        })

      });    

      return earthquakes;
  
}



