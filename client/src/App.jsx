import { useEffect, useState, useRef } from "react";
import {
  createBooks,
  getBinarySearchMoves,
  getPathResult,
  getSortMoves
} from "./algorithms";

const ROWS = 20;
const COLUMNS = 40;

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLUMNS }, () => 0)
  );
}

function Home({ setPage }) {
  return (
    <main className="home">
      <p className="eyebrow">Data Structures and Algorithms</p>
      <h1>Algorithms Visualizer</h1>
      <p className="intro">
        Explore sorting algorithms and graph traversal through interactive
        visualizations.
      </p>

      <div className="home-actions">
        <button onClick={() => setPage("sorting")}>Open Sorting</button>
        <button onClick={() => setPage("pathfinding")}>
          Open Path Finding
        </button>
      </div>
    </main>
  );
}

function SortingVisualizer() {
  const [count, setCount] = useState(20);
  const [speed, setSpeed] = useState(100);
  const [algorithm, setAlgorithm] = useState("");
  const [books, setBooks] = useState(() => createBooks(20));
  const [originalBooks, setOriginalBooks] = useState(() => [...books]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const runId = useRef(0);

  function generateBooks(worstCase = false) {
    const generated = createBooks(count, worstCase);
    setBooks(generated);
    setOriginalBooks([...generated]);
    setActiveIndices([]);
    setMessage("");
  }

  function reset() {
    setBooks([...originalBooks]);
    setActiveIndices([]);
    setMessage("");
  }

  async function runSort() {
    if (!algorithm) {
      setMessage("Select a sorting algorithm first.");
      return;
    }

    const currentRunId = runId.current + 1;
    runId.current = currentRunId;

    setRunning(true);
    setMessage("");

    const moves = getSortMoves(books, algorithm);

    for (const move of moves) {
      if (runId.current !== currentRunId) {
        return;
      }

      setActiveIndices(move.indices);

      if (move.type === "swap") {
        setBooks((current) => {
          const updated = [...current];
          const [left, right] = move.indices;

          [updated[left], updated[right]] = [updated[right], updated[left]];

          return updated;
        });
      }

      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    if (runId.current === currentRunId) {
      setActiveIndices([]);
      setRunning(false);
      setMessage("The bookshelf is sorted.");
    }
  }

  function stopSort() {
    runId.current += 1;
    setRunning(false);
    setActiveIndices([]);
    setMessage("Sorting stopped.");
  }

  return (
    <main className="visualizer">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Sorting</p>
          <h1>The Library</h1>
        </div>
        <p>Compare sorting strategies by watching every operation.</p>
      </div>

      <section className="controls">
        <label>
          Books: {count}
          <input
            type="range"
            min="3"
            max="50"
            value={count}
            disabled={running}
            onChange={(event) => {
              const nextCount = Number(event.target.value);
              setCount(nextCount);
              const generated = createBooks(nextCount);
              setBooks(generated);
              setOriginalBooks([...generated]);
            }}
          />
        </label>

        <label>
          Delay: {speed}ms
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={speed}
            disabled={running}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </label>

        <select
          value={algorithm}
          disabled={running}
          onChange={(event) => setAlgorithm(event.target.value)}
        >
          <option value="">Choose an algorithm</option>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="quick">Quick Sort</option>
        </select>

        <div className="button-row">
          <button disabled={running} onClick={runSort}>
            Run
          </button>

          <button disabled={!running} onClick={stopSort}>
            Stop
          </button>

          <button disabled={running} onClick={reset}>
            Reset
          </button>

          <button disabled={running} onClick={() => generateBooks(false)}>
            Random
          </button>

          <button disabled={running} onClick={() => generateBooks(true)}>
            Worst Case
          </button>
        </div>
      </section>

      {message && <p className="message">{message}</p>}

      <section className="bookshelf">
        {books.map((book, index) => (
          <div
            className={`book ${activeIndices.includes(index) ? "book-active" : ""
              }`}
            style={{ backgroundColor: book.color }}
            key={`${book.name}-${index}`}
          >
            {book.name}
          </div>
        ))}
      </section>
    </main>
  );
}

function PathFindingVisualizer() {
  const [grid, setGrid] = useState(createEmptyGrid);
  const [mode, setMode] = useState("wall");
  const [algorithm, setAlgorithm] = useState("bfs");
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const runId = useRef(0);

  function cellKey(cell) {
    return `${cell.row}:${cell.column}`;
  }

  function updateCell(row, column) {
    if (running) {
      return;
    }

    const nextGrid = grid.map((gridRow) => [...gridRow]);

    if (mode === "wall") {
      nextGrid[row][column] = nextGrid[row][column] === 2 ? 0 : 2;
    }

    if (mode === "start") {
      if (goal?.row === row && goal?.column === column) {
        return;
      }

      setStart({ row, column });
    }

    if (mode === "goal") {
      if (start?.row === row && start?.column === column) {
        return;
      }

      setGoal({ row, column });
    }

    setGrid(nextGrid);
    setVisited([]);
    setPath([]);
  }

  function clearGrid() {
    setGrid(createEmptyGrid());
    setStart(null);
    setGoal(null);
    setVisited([]);
    setPath([]);
    setMessage("");
  }

  async function runPathFinding() {
    if (!start || !goal) {
      setMessage("Set both a start and goal cell.");
      return;
    }

    const currentRunId = runId.current + 1;
    runId.current = currentRunId;

    setRunning(true);
    setMessage("");
    setVisited([]);
    setPath([]);

    const result = getPathResult(grid, start, goal, algorithm);

    for (const cell of result.visited) {
      if (runId.current !== currentRunId) {
        return;
      }

      setVisited((current) => [...current, cell]);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    if (result.path.length === 0) {
      setMessage("No path found.");
    }

    for (const cell of result.path) {
      if (runId.current !== currentRunId) {
        return;
      }

      setPath((current) => [...current, cell]);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    if (runId.current === currentRunId) {
      setRunning(false);
    }
  }

  function stopPathFinding() {
    runId.current += 1;
    setRunning(false);
    setVisited([]);
    setPath([]);
    setMessage("Pathfinding stopped.");
  }

  return (
    <main className="visualizer">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Graph Traversal</p>
          <h1>Path Finding</h1>
        </div>
        <p>Draw a maze and visualize breadth-first or depth-first search.</p>
      </div>

      <section className="controls">
        <select
          value={algorithm}
          disabled={running}
          onChange={(event) => {
            setAlgorithm(event.target.value);
            setVisited([]);
            setPath([]);
            setMessage("");
          }}
        >
          <option value="bfs">Breadth-first Search</option>
          <option value="dfs">Depth-first Search</option>
        </select>

        <div className="button-row">
          <button
            disabled={running}
            className={mode === "wall" ? "selected" : ""}
            onClick={() => setMode("wall")}
          >
            Wall
          </button>

          <button
            disabled={running}
            className={mode === "start" ? "selected" : ""}
            onClick={() => setMode("start")}
          >
            Start
          </button>

          <button
            disabled={running}
            className={mode === "goal" ? "selected" : ""}
            onClick={() => setMode("goal")}
          >
            Goal
          </button>
          <button onClick={clearGrid} disabled={running}>
            Clear
          </button>

          <button onClick={runPathFinding} disabled={running}>
            Run
          </button>

          <button onClick={stopPathFinding} disabled={!running}>
            Stop
          </button>
        </div>
      </section>

      {message && <p className="message">{message}</p>}

      <section
        className="grid"
        style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, columnIndex) => {
            const current = { row: rowIndex, column: columnIndex };
            const key = cellKey(current);

            const isStart = start && cellKey(start) === key;
            const isGoal = goal && cellKey(goal) === key;
            const isVisited = visited.some((cell) => cellKey(cell) === key);
            const isPath = path.some((cell) => cellKey(cell) === key);

            return (
              <button
                className={[
                  "cell",
                  value === 2 ? "wall" : "",
                  isVisited ? "visited" : "",
                  isPath ? "path" : "",
                  isStart ? "start" : "",
                  isGoal ? "goal" : ""
                ].join(" ")}
                key={key}
                onClick={() => updateCell(rowIndex, columnIndex)}
                aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}`}
              />
            );
          })
        )}
      </section>
    </main>
  );
}

function BinarySearchVisualizer() {
  const [count, setCount] = useState(20);
  const [speed, setSpeed] = useState(700);
  const [books, setBooks] = useState(() => createSortedBooks(20));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const runId = useRef(0);

  function createSortedBooks(bookCount) {
    return createBooks(bookCount).sort((left, right) =>
      left.name.localeCompare(right.name)
    );
  }

  function generateBooks(bookCount = count) {
    runId.current += 1;

    setBooks(createSortedBooks(bookCount));
    setSelectedIndex(null);
    setActiveIndex(null);
    setRunning(false);
    setMessage("");
  }

  function selectBook(index) {
    if (running) {
      return;
    }

    setSelectedIndex(index);
    setActiveIndex(null);
    setMessage(`Selected book: ${books[index].name}`);
  }

  async function runSearch() {
    if (selectedIndex === null) {
      setMessage("Select a book first.");
      return;
    }

    const currentRunId = runId.current + 1;
    runId.current = currentRunId;

    const targetName = books[selectedIndex].name;
    const moves = getBinarySearchMoves(books, targetName);

    setRunning(true);
    setActiveIndex(null);
    setMessage(`Searching for ${targetName}...`);

    for (const move of moves) {
      if (runId.current !== currentRunId) {
        return;
      }

      if (move.type === "compare") {
        setActiveIndex(move.index);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }

      if (move.type === "found") {
        setActiveIndex(move.index);
        setMessage(`Found ${targetName} at position ${move.index + 1}.`);
      }

      if (move.type === "not-found") {
        setActiveIndex(null);
        setMessage(`${targetName} was not found.`);
      }
    }

    if (runId.current === currentRunId) {
      setRunning(false);
    }
  }

  function stopSearch() {
    runId.current += 1;
    setRunning(false);
    setActiveIndex(null);
    setMessage("Binary search stopped.");
  }

  function createSortedBooks(count) {
    return createBooks(count).sort((left, right) =>
      left.name.localeCompare(right.name)
    );
  }

  return (
    <main className="visualizer">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Searching</p>
          <h1>Binary Search</h1>
        </div>

        <p>
          Select a sorted book collection and watch binary search narrow the
          search range.
        </p>
      </div>

      <section className="controls">
        <label>
          Books: {count}
          <input
            type="range"
            min="3"
            max="50"
            value={count}
            disabled={running}
            onChange={(event) => {
              const nextCount = Number(event.target.value);
              setCount(nextCount);
              generateBooks(nextCount);
            }}
          />
        </label>

        <label>
          Delay: {speed}ms
          <input
            type="range"
            min="100"
            max="1500"
            step="100"
            value={speed}
            disabled={running}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </label>

        <div className="button-row">
          <button disabled={running} onClick={() => generateBooks()}>
            Random
          </button>

          <button
            disabled={running || selectedIndex === null}
            onClick={runSearch}
          >
            Run
          </button>

          <button disabled={!running} onClick={stopSearch}>
            Stop
          </button>
        </div>
      </section>

      {message && <p className="message">{message}</p>}

      <section className="bookshelf binary-bookshelf">
        {books.map((book, index) => (
          <button
            className={[
              "book",
              selectedIndex === index ? "book-target" : "",
              activeIndex === index ? "book-searching" : ""
            ].join(" ")}
            style={{ backgroundColor: book.color }}
            key={`${book.name}-${index}`}
            disabled={running}
            onClick={() => selectBook(index)}
          >
            {book.name}
          </button>
        ))}
      </section>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    document.title = "Algorithms Visualizer";
  }, []);

  return (
    <>
      <header className="header">
        <button className="brand" onClick={() => setPage("home")}>
          Algorithms Visualizer
        </button>

        <nav>
          <button onClick={() => setPage("binarysearch")}>Binary Search</button>
          <button onClick={() => setPage("sorting")}>Sorting</button>
          <button onClick={() => setPage("pathfinding")}>Path Finding</button>
        </nav>
      </header>

      {page === "home" && <Home setPage={setPage} />}
      {page === "binarysearch" && <BinarySearchVisualizer />}
      {page === "sorting" && <SortingVisualizer />}
      {page === "pathfinding" && <PathFindingVisualizer />}
    </>
  );
}