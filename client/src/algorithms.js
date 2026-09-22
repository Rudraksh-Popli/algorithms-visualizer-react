export class Book {
    constructor(name) {
        this.name = name.toUpperCase();
        this.color = getBookColor(this.name);
    }
}

function getBookColor(name) {
    const colors = {
        A: "#ffbf00",
        B: "#0095b6",
        C: "#ffa07a",
        D: "#f0e68c",
        E: "#50c878",
        F: "#b22222",
        G: "#daa520",
        H: "#df73ff",
        I: "#fffff0",
        J: "#00a86b",
        K: "#c3b091",
        M: "#2f2f4f",
        N: "#000080",
        O: "#ffa500",
        P: "#d1e231",
        Q: "#bebebe",
        R: "#8b0000",
        S: "#f4a460",
        T: "#008080",
        U: "#3f00ff",
        V: "#8f00ff",
        W: "#f5deb3",
        X: "#f1b82d",
        Y: "#ffff00",
        Z: "#008000"
    };

    return colors[name] || "#000000";
}

export function createBooks(count, worstCase = false) {
    const books = [];

    for (let index = 0; index < count; index += 1) {
        const letter = worstCase
            ? String.fromCharCode(90 - (index % 26))
            : String.fromCharCode(65 + Math.floor(Math.random() * 26));

        books.push(new Book(letter));
    }

    return books;
}

export function getSortMoves(books, algorithm) {
    const values = books.map((book) => ({ ...book }));
    const moves = [];

    const compare = (left, right) => {
        moves.push({
            type: "compare",
            indices: [left, right]
        });

        return values[left].name.localeCompare(values[right].name);
    };

    const swap = (left, right) => {
        moves.push({
            type: "swap",
            indices: [left, right]
        });

        [values[left], values[right]] = [values[right], values[left]];
    };

    if (algorithm === "bubble") {
        for (let end = values.length - 1; end > 0; end -= 1) {
            let swapped = false;
            for (let index = 0; index < end; index += 1) {
                if (compare(index, index + 1) > 0) {
                    swap(index, index + 1);
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
    }

    if (algorithm === "selection") {
        for (let start = 0; start < values.length - 1; start += 1) {
            let smallest = start;

            for (let index = start + 1; index < values.length; index += 1) {
                if (compare(index, smallest) < 0) {
                    smallest = index;
                }
            }

            if (smallest !== start) {
                swap(start, smallest);
            }
        }
    }

    if (algorithm === "insertion") {
        for (let index = 1; index < values.length; index += 1) {
            let current = index;

            while (current > 0 && compare(current - 1, current) > 0) {
                swap(current - 1, current);
                current -= 1;
            }
        }
    }

    if (algorithm === "quick") {
        function quickSort(left, right) {
            if (left >= right) {
                return;
            }

            const pivot = values[Math.floor((left + right) / 2)].name;
            let start = left;
            let end = right;

            while (start <= end) {
                while (values[start].name < pivot) {
                    compare(start, Math.floor((left + right) / 2));
                    start += 1;
                }

                while (values[end].name > pivot) {
                    compare(end, Math.floor((left + right) / 2));
                    end -= 1;
                }

                if (start <= end) {
                    if (start !== end) {
                        swap(start, end);
                    }

                    start += 1;
                    end -= 1;
                }
            }

            quickSort(left, end);
            quickSort(start, right);
        }

        quickSort(0, values.length - 1);
    }

    return moves;
}

export function getPathResult(grid, start, goal, algorithm) {
    if (!start || !goal) {
        return {
            visited: [],
            path: []
        };
    }

    const rows = grid.length;
    const columns = grid[0].length;
    const visited = [];
    const previous = new Map();
    const seen = new Set();
    const key = (row, column) => `${row}:${column}`;
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    const canVisit = (row, column) => {
        return (
            row >= 0 &&
            row < rows &&
            column >= 0 &&
            column < columns &&
            grid[row][column] !== 2
        );
    };

    const startKey = key(start.row, start.column);
    const goalKey = key(goal.row, goal.column);

    if (algorithm === "bfs") {
        const queue = [start];
        seen.add(startKey);

        while (queue.length > 0) {
            const current = queue.shift();
            visited.push(current);

            if (key(current.row, current.column) === goalKey) {
                break;
            }

            for (const [rowOffset, columnOffset] of directions) {
                const next = {
                    row: current.row + rowOffset,
                    column: current.column + columnOffset
                };

                const nextKey = key(next.row, next.column);

                if (canVisit(next.row, next.column) && !seen.has(nextKey)) {
                    seen.add(nextKey);
                    previous.set(nextKey, current);
                    queue.push(next);
                }
            }
        }
    } else {
        const stack = [start];
        seen.add(startKey);

        while (stack.length > 0) {
            const current = stack.pop();
            visited.push(current);

            if (key(current.row, current.column) === goalKey) {
                break;
            }

            for (const [rowOffset, columnOffset] of directions) {
                const next = {
                    row: current.row + rowOffset,
                    column: current.column + columnOffset
                };

                const nextKey = key(next.row, next.column);

                if (canVisit(next.row, next.column) && !seen.has(nextKey)) {
                    seen.add(nextKey);
                    previous.set(nextKey, current);
                    stack.push(next);
                }
            }
        }
    }

    const path = [];
    let currentKey = goalKey;
    let current = goal;

    while (current) {
        path.unshift(current);

        if (currentKey === startKey) {
            break;
        }

        current = previous.get(currentKey);

        if (!current) {
            return {
                visited,
                path: []
            };
        }

        currentKey = key(current.row, current.column);
    }

    return {
        visited,
        path
    };
}

export function getBinarySearchMoves(books, targetName) {
    const values = books.map((book) => book.name);
    const moves = [];

    let left = 0;
    let right = values.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);

        moves.push({
            type: "compare",
            index: middle
        });

        const comparison = values[middle].localeCompare(targetName);

        if (comparison === 0) {
            moves.push({
                type: "found",
                index: middle
            });

            return moves;
        }

        if (comparison < 0) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    moves.push({
        type: "not-found"
    });

    return moves;
}