export class Geometry {
    type: string;
    longitude: number;
    latitude: number;
    depth: number;

    constructor(type:string, longitude: number, latitude: number,depth: number) {
    this.type = type;
    this.longitude = longitude;
    this.latitude = latitude;
    this.depth = depth;
    }
}
