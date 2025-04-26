export class Properties {
    mag: number;
    place: string;
    time: number;
    type: string;
    sig: number;

   constructor(mag: number, place: string, time: number, type: string, sig: number) {
    this.mag = mag;
    this.place = place;
    this.time = time;
    this.type = type;
    this.sig = sig;
} 

    convertedTime(): string {
        return new Date(this.time).toLocaleString();
    }
    

}

