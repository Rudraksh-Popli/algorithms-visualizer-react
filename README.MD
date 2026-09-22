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
└── README.md

Important Files
client/src/App.jsx
Contains the main React application and the sorting and pathfinding visualizer components.

client/src/algorithms.js
Contains the algorithm implementations:

Book generation
Sorting move generation
Breadth-First Search
Depth-First Search
Path reconstruction
client/src/styles.css
Contains the visual styling for the application, controls, bookshelf, grid, cells, animations, and responsive layout.

server/index.js
Contains the Express server. It provides:

Static file serving for the production build
A health-check endpoint
A fallback route for the React application
Installation
Clone the repository and move into the project directory:


Install the dependencies:


Running the Application
Start the frontend development server:


The application will be available at:


To start the Express backend in a separate terminal:


The backend will run at:


The backend health endpoint is:


How to Use
Sorting
Open the Sorting page.
Select a sorting algorithm.
Adjust the number of books if needed.
Adjust the animation delay.
Click Run.
Use Reset to restore the original data.
Use Random or Worst Case to generate new input.
Pathfinding
Open the Path Finding page.
Select Breadth-First Search or Depth-First Search.
Select Start, then click a grid cell.
Select Goal, then click another grid cell.
Select Wall to draw obstacles.
Click Run to start the visualization.
Click Clear to reset the grid.
Algorithm Overview
Bubble Sort
Repeatedly compares neighboring values and swaps them when they are in the wrong order.

Time complexity: 
𝑂
(
𝑛
2
)
O(n 
2
 )
Space complexity: 
𝑂
(
1
)
O(1)
Selection Sort
Finds the smallest remaining value and places it at the next position.

Time complexity: 
𝑂
(
𝑛
2
)
O(n 
2
 )
Space complexity: 
𝑂
(
1
)
O(1)
Insertion Sort
Builds the sorted portion of the collection one value at a time.

Best-case time complexity: 
𝑂
(
𝑛
)
O(n)
Worst-case time complexity: 
𝑂
(
𝑛
2
)
O(n 
2
 )
Space complexity: 
𝑂
(
1
)
O(1)
Quick Sort
Selects a pivot and partitions the values into smaller and larger groups.

Average time complexity: 
𝑂
(
𝑛
log
⁡
𝑛
)
O(nlogn)
Worst-case time complexity: 
𝑂
(
𝑛
2
)
O(n 
2
 )
Space complexity: 
𝑂
(
log
⁡
𝑛
)
O(logn) on average
Breadth-First Search
Explores all neighboring cells before moving to the next level. In an unweighted grid, BFS finds the shortest path when one exists.

Time complexity: 
𝑂
(
𝑉
+
𝐸
)
O(V+E)
Space complexity: 
𝑂
(
𝑉
)
O(V)
Depth-First Search
Explores one path as deeply as possible before backtracking.

Time complexity: 
𝑂
(
𝑉
+
𝐸
)
O(V+E)
Space complexity: 
𝑂
(
𝑉
)
O(V)
Production Build
Build the frontend:


Then start the Express server:


The production application will be available at:


Learning Goals
This project is designed to help learners:

Understand how sorting algorithms operate
Compare algorithm behavior visually
Observe comparisons and swaps
Understand graph traversal
See how shortest paths are discovered
Connect algorithm theory with practical implementation
Experiment with different input conditions
License
This project is intended for educational use.