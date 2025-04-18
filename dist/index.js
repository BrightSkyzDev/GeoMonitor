"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Properties_1 = require("./Properties");
const Geometry_1 = require("./Geometry");
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`);
        const data = yield response.json();
        return data;
    });
}
function pollApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const pollData = yield getData();
        pollData.features.forEach((feature) => {
            const mag = feature.properties.mag;
            const place = feature.properties.place;
            const time = feature.properties.time;
            const propertiesType = feature.properties.type;
            const sig = feature.properties.sig;
            const quakeProps = new Properties_1.Properties(mag, place, time, propertiesType, sig);
            const geometryType = feature.geometry.type;
            const longitude = feature.geometry.coordinates[0];
            const latitude = feature.geometry.coordinates[1];
            const depth = feature.geometry.coordinates[2];
            const quakeGeo = new Geometry_1.Geometry(geometryType, longitude, latitude, depth);
            console.log(quakeProps);
            console.log(quakeGeo);
            console.log(`Time of earthquake: ${quakeProps.convertedTime()}`);
        });
    });
}
pollApi();
const intervalID = setInterval(pollApi, 60000);
