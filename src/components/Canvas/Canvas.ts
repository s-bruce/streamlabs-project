import {IMAGES_DATA} from './mockData';
import {CanvasImage} from '../CanvasImage/CanvasImage';

/** Class representing a canvas. */
export class Canvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    canvasImages: CanvasImage[];

    /** Create a canvas. */
    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.canvasImages = [];
        this.resize();

        window.addEventListener('resize', this.resize.bind(this));

        if (this.ctx) {
            this.fillRect();

            for (const imageData of IMAGES_DATA) {
                this.canvasImages.push(new CanvasImage(imageData, this.canvas, this.ctx, this.redraw.bind(this)));
            }
        }
    }

    /** Fill the canvas. */
    fillRect() {
        if (this.ctx) {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /** Clear and redraw the canvas. */
    redraw() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.fillRect();

            for (const canvasImage of this.canvasImages) {
                canvasImage.draw();
            }
        }
    }

    /** Resize the canvas, filling the viewport and maintaining the correct aspect ratio. */
    resize() {
        const aspectRatio = 16 / 9;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const windowAspectRatio = windowWidth / windowHeight;
        
        if (windowAspectRatio > aspectRatio) {
            this.canvas.width = windowHeight * aspectRatio;
            this.canvas.height = windowHeight;
        } else {
            this.canvas.width = windowWidth;
            this.canvas.height = windowWidth / aspectRatio;
        }

        this.redraw();
    }
}
