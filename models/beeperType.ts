export interface Beeper { 
    id: string, 
    name: string,
    status: string, 
    createdAt: Date, 
    detonatedAt?: Date,
    latitude: Number, 
    longitude: Number, 
}

export enum Status {
    manufactured,
    assembled,
    shipped,
    deployed,
    detonated
}

export interface Coordinates {
    latitude:number,
    longitude:number
}