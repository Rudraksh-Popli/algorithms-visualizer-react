# Algorithms Visualizer

An interactive React application for exploring sorting algorithms, binary search, and graph traversal. The visualizer represents values as books and shows comparisons, swaps, visited cells, and discovered paths as the algorithms run.

## Features

- **Sorting visualizer**
  - Bubble sort
  - Selection sort
  - Insertion sort
  - Quick sort
  - Adjustable book count and animation delay
  - Random and worst-case data generation
  - Reset and stop controls
- **Binary search visualizer**
  - Searches a sorted collection of books
  - Select a target book and watch each midpoint comparison
- **Pathfinding visualizer**
  - Breadth-first search (BFS)
  - Depth-first search (DFS)
  - 20 x 40 editable grid
  - Wall, start, and goal placement
  - Animated visited cells and final paths

## Requirements

- Node.js 18 or newer
- npm

## Getting Started

1. Clone the repository and enter the project directory.

   ```bash
   git clone <repository-url>
   cd Algorithms-Visualizer
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Start the Vite development server.

   ```bash
   npm run dev
   ```

4. Open the URL shown by Vite, normally:

   ```text
   http://localhost:5173/algorithms-visualizer-react/
   ```

## Production Build

Build the client into `client/dist`:

```bash
npm run build
```

To serve the production build with Express:

```bash
node server/index.js
```

The server runs on port `3000` by default. Set `PORT` to use another port:

```bash
# macOS/Linux
PORT=4000 node server/index.js

# Windows PowerShell
$env:PORT=4000; node server/index.js
```

Then open `http://localhost:3000/algorithms-visualizer-react/` or the configured port. The health endpoint is available at `/api/health`.

## How to Use

### Sorting

Choose an algorithm, adjust the number of books and animation delay, then select **Run**. Use **Random** to generate new values, **Worst Case** to generate descending values, **Reset** to restore the current generated collection, or **Stop** to cancel an animation.

### Binary Search

The books are generated in sorted order. Select a book, then run the search to see binary search inspect the middle of the remaining range until it finds the target.

### Path Finding

Choose **Start** or **Goal** and click cells to place the endpoints. Choose **Wall** to toggle obstacles, select BFS or DFS, and click **Run**. Use **Clear** to reset the grid.

## Algorithm Complexity

| Algorithm | Best | Average | Worst | Extra Space |
| --- | ---: | ---: | ---: | ---: |
| Bubble sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion sort | O(n) | O(n²) | O(n²) | O(1) |
| Quick sort | O(n log n) | O(n log n) | O(n²) | O(log n) average |
| Binary search | O(1) | O(log n) | O(log n) | O(1) |
| BFS / DFS | O(V + E) | O(V + E) | O(V + E) | O(V) |

The visualizer records individual operations so the animation may take longer than the underlying algorithmic complexity suggests.

## Project Structure

```text
.
├── client/
│   ├── index.html
│   └── src/
│       ├── algorithms.js   # Algorithm implementations and move generation
│       ├── App.jsx         # React visualizers and application navigation
│       ├── main.jsx        # React entry point
│       └── styles.css       # Application styles
├── server/
│   └── index.js            # Express server for the production build
├── package.json
└── vite.config.js
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the client for production |
| `node server/index.js` | Serve the production build with Express |

## License

No license has been specified for this project yet.