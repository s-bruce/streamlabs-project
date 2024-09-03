import catImage from '/src/assets/cat.png';
import dogImage from '/src/assets/dog.png';
import {ImageData} from "../CanvasImage/types";

/** Hardcoded data for the images that will be drawn on the canvas. */
export const IMAGES_DATA: ImageData[] = [
    {
        name: 'Cat Image',
        src: catImage,
        dimensions: {
            width: 200,
            height: 186,
        },
        coordinates: {
            x: 100,
            y: 100,
        },
    },
    {
        name: 'Dog Image',
        src: dogImage,
        dimensions: {
            width: 200,
            height: 189,
        },
        coordinates: {
            x: 400,
            y: 100,
        },
    }
];