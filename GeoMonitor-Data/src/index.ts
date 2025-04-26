import {Properties} from "./Properties"
import {Geometry} from "./Geometry"

const apiTimeout: number = 60000;

async function getData() {
    const response = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`)
    const data = await response.json();
    return data;
}

async function pollApi() {
    const pollData = await getData();

    pollData.features.forEach((feature: any) => {

        //Properties - combine later -
        let mag: number = feature.properties.mag;
        let place: string = feature.properties.place;
        let time: number = feature.properties.time;
        let propertiesType: string = feature.properties.type;
        let sig: number = feature.properties.sig;

        const quakeProps: Properties = new Properties(mag, place, time, propertiesType, sig);

        //Geometry - combine later -
        let geometryType = feature.geometry.type;
        let longitude = feature.geometry.coordinates[0];
        let latitude = feature.geometry.coordinates[1];
        let depth = feature.geometry.coordinates[2];

        const quakeGeo = new Geometry(geometryType, longitude, latitude, depth);

        console.log(quakeProps);
        console.log(quakeGeo);
        console.log(`Time of earthquake: ${quakeProps.convertedTime()}`);           

      });    
   
}

pollApi() ;

setInterval(pollApi, apiTimeout);

