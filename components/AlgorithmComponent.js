import { useState } from "react";
import { dijkstra } from "../utils/algorithm";
import styles from "../styles/algoStyles.module.css";

export default function AlgorithmComponent() {
  const [grid, setGrid] = useState([...Array(10)].map(() => Array(10).fill(0)));
  const [path, setPath] = useState([]);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 9, y: 9 });
  const [isSettingStart, setIsSettingStart] = useState(true);

  const handleFindPath = () => {
    resetPath();
    const foundPath = dijkstra(grid, start, end);
    animatePath(foundPath);
  };

  const resetPath = () => {
    setPath([]);
  };

  const resetGrid = () => {
    setGrid([...Array(10)].map(() => Array(10).fill(0)));
    setPath([]);
    setStart({ x: 0, y: 0 });
    setEnd({ x: 9, y: 9 });
  };

  const animatePath = (foundPath) => {
    foundPath.forEach((pos, index) => {
      setTimeout(() => {
        setPath((prevPath) => [...prevPath, pos]);
      }, index * 50);
    });
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          if (cell === 1) return 0; // Toggle obstacle off
          if (cell === 0) return 1; // Toggle obstacle on
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const handlePointClick = (rowIndex, colIndex) => {
    if (grid[rowIndex][colIndex] === 1) return;
    const newPoint = { x: rowIndex, y: colIndex };
    if (isSettingStart) {
      setStart(newPoint);
      setIsSettingStart(false);
    } else {
      setEnd(newPoint);
      setIsSettingStart(true);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Pathfinding Visualization with Dijkstra's Algorithm</h1>
        <p>
          Click on the grid to toggle obstacles. Click "Find Path" to visualize
          the path (green). Click on the start (blue) or end (red) points to
          move them.
        </p>
      </header>
      <div className={styles.controls}>
        <button onClick={handleFindPath}>Find Path</button>
        <button onClick={resetPath}>Clear Path</button>
        <button onClick={resetGrid}>Reset Grid</button>
      </div>
      <div className={styles.grid}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => {
              const isPath = path.some(
                (p) => p.x === rowIndex && p.y === colIndex
              );
              const isStart = start.x === rowIndex && start.y === colIndex;
              const isEnd = end.x === rowIndex && end.y === colIndex;
              const cellStyle = {
                backgroundColor:
                  cell === 1
                    ? "black"
                    : isStart
                    ? "blue"
                    : isEnd
                    ? "red"
                    : isPath
                    ? "green"
                    : "white",
              };
              return (
                <div
                  key={colIndex}
                  className={styles.cell}
                  style={cellStyle}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onDoubleClick={() => handlePointClick(rowIndex, colIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
      <p>
          <a href="https://github.com/Bassamnaeem/pathfinding-visualization" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>      </footer>
    </div>
  );
}
