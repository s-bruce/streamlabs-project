export type Coordinates = {
    x: number;
    y: number;
}

export type Edges = {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export type ImageData = {
    name: string;
    src: string;
    dimensions: {
        width: number;
        height: number;
    };
    coordinates: {
        x: number;
        y: number;
    };
};