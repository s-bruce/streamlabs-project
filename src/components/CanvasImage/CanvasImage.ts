import {Coordinates, Edges, ImageData} from './types';

/** Class representing a canvas image. */
export class CanvasImage {
    src: string;
    dimensions: {
        width: number;
        height: number;
    };
    coordinates: Coordinates;
    edges: Edges;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    img: HTMLImageElement;
    draggable: boolean;
    dragging: boolean;
    mouseStartCoordinates: Coordinates;
    drawCanvas: () => void;

    /**
     * Create a canvas image.
     * @param {ImageData} imageData - The data for the image.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {CanvasRenderingContext2D} ctx - The canvas's rendering context.
     * @param {() => void} drawCanvas - The callback for redrawing the canvas.
     * */
    constructor(imageData: ImageData, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, drawCanvas: () => void) {
        this.src = imageData.src;
        this.dimensions = imageData.dimensions;
        this.coordinates = imageData.coordinates;
        this.edges = this.calculateEdges();
        this.canvas = canvas;
        this.ctx = ctx;
        this.draggable = false;
        this.dragging = false;
        this.mouseStartCoordinates = {x: 0, y: 0};
        this.drawCanvas = drawCanvas;

        this.img = new Image();
        this.img.addEventListener('load', () => this.draw());
        this.img.src = this.src;

        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e as MouseEvent));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e as MouseEvent));
    }

    /** Draw the image onto the canvas. */
    draw() {
        this.ctx.drawImage(this.img, this.coordinates.x, this.coordinates.y, this.dimensions.width, this.dimensions.height);

        // Draw border around image if it's being dragged
        if (this.dragging) {
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'green';
            this.ctx.strokeRect(this.coordinates.x, this.coordinates.y, this.dimensions.width, this.dimensions.height);
        }
    }

    /**
     * Calculate the coordinates for the edges of the image.
     * @return {Edges} The edges of the image.
     */
    calculateEdges() {
        return {
            top: this.coordinates.y,
            right: this.coordinates.x + this.dimensions.width,
            bottom: this.coordinates.y + this.dimensions.height,
            left: this.coordinates.x,
        }
    }

    /** Handle the mousedown event when it's triggered for the canvas. */
    handleMouseDown(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Check if the mouse is over the image
        if (mouseX >= this.edges.left && mouseX <= this.edges.right && mouseY >= this.edges.top && mouseY <= this.edges.bottom) {
            this.draggable = true;
            this.mouseStartCoordinates = {x: mouseX, y: mouseY};
        }
    }

    /** Handle the mouseup event when it's triggered for the canvas. */
    handleMouseUp() {
        this.draggable = false;
        this.dragging = false;
        this.edges = this.calculateEdges();
        this.drawCanvas();
    }

    /** Handle the mousemove event when it's triggered for the canvas. */
    handleMouseMove(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        // Only proceed if the mouse is down and over the image
        if (this.draggable) {
            const newMouseX = e.clientX;
            const newMouseY = e.clientY;

            // Calculate the distance that the mouse has moved
            const distanceX = newMouseX - this.mouseStartCoordinates.x;
            const distanceY = newMouseY - this.mouseStartCoordinates.y;

            // Calculate the new image coordinates based on the distance the mouse has moved
            const newImageX = this.coordinates.x + distanceX;
            const newImageY = this.coordinates.y + distanceY;

            // If the new image coordinates will be outside the canvas, stop dragging
            if (
                newImageX < 0 ||
                newImageX + this.dimensions.width > this.canvas.width ||
                newImageY < 0 ||
                newImageY + this.dimensions.height > this.canvas.height
            ) {
                this.handleMouseUp();
                return;
            }

            // Update image cordinates with the new coordinates
            this.coordinates.x = newImageX;
            this.coordinates.y = newImageY;

            // Update mouseStartCoordinates with the new mouse coordinates
            this.mouseStartCoordinates = {x: newMouseX, y: newMouseY};

            // Set dragging to true
            this.dragging = true;

            // Redraw canvas
            this.drawCanvas();
        }
    }
}
