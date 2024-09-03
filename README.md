# Streamlabs Canvas Frontend Project
This is an HTML page that contains a single canvas, with two rendered images that can be dragged around using the mouse. The application is written in TypeScript with no frontend framework. It is my solution for [Streamlabs take home assignment](https://github.com/stream-labs/canvas-frontend-project).

## Installation

1. Clone the repository
```
git clone https://github.com/s-bruce/streamlabs-project.git
```

2. Change directories into the project
```
cd streamlabs-project
```

3. Install packages
```
npm install
```

4. Start the dev server
```
npm run dev
```

5. View the application in your browser at [http://localhost:5173](http://localhost:5173)

## Assignment Answers

**How long did it take you to complete this assignment?**<br>
It took me around four hours to complete the project.

**What about this assignment did you find most challenging?**<br>
I actually found the canvas sizing/responsiveness to be the most challenging. I originally planned to set fixed dimensions (1920px x 1080px) and use the css `scale()` function to proportionally scale the canvas and its contents (to mimic how the Streamlabs desktop app appears to function). However, I made the mistake of implementing the scaling after I'd built everything else, and didn't take into consideration that all of the coordinates would be off since the coordinates weren't also scaled. I decided to forgo the scale approach and instead implement standard responsiveness by updating
`width` and `height`.

**What about this assignment did you find unclear?**<br>
I didn't necessarily find anything unclear, but I did make a couple assumptions:
- The definition of `begin dragging` and `end dragging` - After looking at the Streamlabs desktop app, I decided that dragging doesn't begin until the user moves their mouse (rather than when they click down); and dragging ends either when the user releases their click or when the user attempts to drag the image outside of the canvas.
- The canvas and its contents should scale proportionally - As I mentioned above, I originally assumed that the canvas and its contents should both scale. However, when I ran into issues with this approach, I re-read the instructions and decided the instructions could be interpreted either way.

**Do you feel like this assignment has an appropriate level of difficulty?**<br>
Yes. The assignment involves some challenges, but is also completely solveable within a reasonable amount of time.

**Briefly explain the technical decisions you made in this project, i.e. architecture, code-splitting, libraries, or other decisions and tradeoffs.**<br>
- Vite - I decided to use Vite to scaffold my project. Its dev server takes care of complexity like transpiling TypeScript, making set up and development much faster.
- Component architecture - Even though I'm not using a framework, I decided to structure the codebase following a component-based architecture to get the benefits of encapsulating content and logic.
- Scaling with `width` and `height` - As mentioned, I ultimately decided to scale the canvas by updating `width` and `height` rather than the css `scale` function. The complexity needed to scale all of the dimensions and coordinates within the canvas and its images didn't seem worth it considering the project requirements didn't specifically ask for proportional scaling.