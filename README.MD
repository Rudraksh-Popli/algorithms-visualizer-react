# Algorithms Visualizer

An interactive React application for learning and exploring fundamental sorting and graph traversal algorithms through visual demonstrations.

The project includes:

- Sorting algorithm visualizations
- Grid-based pathfinding visualizations
- Adjustable animation speed
- Random and worst-case sorting data
- Interactive walls, start points, and goal points
- A lightweight Express backend

## Features

### Sorting Visualizer

The sorting visualizer represents values as books on a bookshelf. Each book contains a letter, and the selected algorithm arranges the books alphabetically.

Supported algorithms:

- Bubble Sort
- Selection Sort
- Insertion Sort
- Quick Sort

Available controls include:

- Change the number of books
- Adjust the animation delay
- Generate random data
- Generate worst-case data
- Reset the bookshelf
- Run the selected sorting algorithm

During execution, comparisons and swaps are highlighted so that the algorithm's behavior can be observed step by step.

### Pathfinding Visualizer

The pathfinding visualizer uses a grid to demonstrate graph traversal algorithms.

Supported algorithms:

- Breadth-First Search
- Depth-First Search

The grid supports:

- Drawing and removing walls
- Selecting a start cell
- Selecting a goal cell
- Visualizing visited cells
- Visualizing the final path
- Clearing and rebuilding the grid

Breadth-First Search explores the grid level by level, while Depth-First Search explores one branch as deeply as possible before backtracking.

## Technologies

- React
- Vite
- JavaScript
- Express
- CSS
- Node.js

## Project Structure

```text
algorithms-visualizer-react/
├── client/
│   ├── index.html
│   └── src/
│       ├── algorithms.js
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
├── server/
│   └── index.js
├── package.json
├── vite.config.js
└── README.MD
```

## Important Files

### `client/src/App.jsx`

Contains the main React application and visualizer components:

- Home page
- Sorting visualizer
- Pathfinding visualizer
- Navigation
- User controls
- Animation state
- Visualization updates

### `client/src/algorithms.js`

Contains the core algorithm logic:

- Book generation
- Sorting move generation
- Bubble Sort
- Selection Sort
- Insertion Sort
- Quick Sort
- Breadth-First Search
- Depth-First Search
- Path reconstruction

### `client/src/main.jsx`

The React entry point. It:

- Imports React
- Imports the main `App` component
- Imports global styles
- Mounts the application into the HTML root element

### `client/src/styles.css`

Contains the visual styling for:

- Page layout
- Header and navigation
- Buttons and controls
- Bookshelf visualization
- Sorting states
- Pathfinding grid
- Wall, start, goal, visited, and path cells
- Responsive layout

### `client/index.html`

The main HTML document used by Vite. It contains the root element where the React application is mounted.

### `server/index.js`

Contains the Express backend. It provides:

- Static serving of the production frontend
- JSON middleware
- Health-check endpoint
- Fallback route for the React application
- HTTP server configuration

### `package.json`

Contains the project metadata, dependencies, and npm scripts used to run and build the application.

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd algorithms-visualizer-react
```

Install the dependencies:

```bash
npm install
```

## Running the Application

Start the frontend development server from the project root:

```bash
npx vite client
```

Open the frontend in your browser:

```text
http://localhost:5173/
```

Start the Express backend in a separate terminal:

```bash
node server/index.js
```

The backend will run at:

```text
http://localhost:3000/
```

The backend health-check endpoint is:

```text
http://localhost:3000/api/health
```

A successful health check returns:

```json
{
  "status": "ok",
  "service": "algorithms-visualizer"
}
```

## How to Use

### Sorting Visualizer

1. Open the Sorting page.
2. Select a sorting algorithm.
3. Adjust the number of books.
4. Adjust the animation delay.
5. Click `Run`.
6. Use `Reset` to restore the original books.
7. Use `Random` to generate random books.
8. Use `Worst Case` to generate descending input.

### Pathfinding Visualizer

1. Open the Path Finding page.
2. Select Breadth-First Search or Depth-First Search.
3. Select `Start`.
4. Click a grid cell to place the start point.
5. Select `Goal`.
6. Click another grid cell to place the goal point.
7. Select `Wall` to draw obstacles.
8. Click `Run` to start the visualization.
9. Click `Clear` to reset the grid.

## Algorithm Overview

### Bubble Sort

Bubble Sort repeatedly compares neighboring values and swaps them when they are in the wrong order.

- Best-case time complexity: `O(n)`
- Average-case time complexity: `O(n^2)`
- Worst-case time complexity: `O(n^2)`
- Space complexity: `O(1)`

### Selection Sort

Selection Sort finds the smallest remaining value and places it in the next sorted position.

- Best-case time complexity: `O(n^2)`
- Average-case time complexity: `O(n^2)`
- Worst-case time complexity: `O(n^2)`
- Space complexity: `O(1)`

### Insertion Sort

Insertion Sort builds the sorted portion of a collection one value at a time.

- Best-case time complexity: `O(n)`
- Average-case time complexity: `O(n^2)`
- Worst-case time complexity: `O(n^2)`
- Space complexity: `O(1)`

### Quick Sort

Quick Sort selects a pivot and partitions the values into smaller and larger groups.

- Average-case time complexity: `O(n log n)`
- Worst-case time complexity: `O(n^2)`
- Average space complexity: `O(log n)`

### Breadth-First Search

Breadth-First Search explores all neighboring cells before moving to the next level.

In an unweighted grid, BFS finds the shortest path when one exists.

- Time complexity: `O(V + E)`
- Space complexity: `O(V)`

### Depth-First Search

Depth-First Search explores one path as deeply as possible before backtracking.

- Time complexity: `O(V + E)`
- Space complexity: `O(V)`

## Production Build

Build the frontend:

```bash
npx vite build client
```

Start the Express server:

```bash
node server/index.js
```

The production application will be available at:

```text
http://localhost:3000/
```

## Learning Goals

This project is designed to help learners:

- Understand how sorting algorithms operate
- Compare algorithm behavior visually
- Observe comparisons and swaps
- Understand graph traversal
- Visualize path discovery
- Experiment with random and worst-case inputs
- Connect algorithm theory with practical implementation
- Learn how React state controls an interactive interface

## GitHub Description

Interactive React visualizer for learning sorting algorithms and graph traversal through animated bookshelf sorting and grid-based pathfinding.

## Suggested GitHub Topics

```text
react
vite
javascript
algorithms
data-structures
sorting-algorithms
pathfinding
breadth-first-search
depth-first-search
visualization
```

## License

This project is intended for educational use.