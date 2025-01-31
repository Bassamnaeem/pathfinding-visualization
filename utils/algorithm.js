class Node {
  constructor(parent = null, position = null) {
    this.parent = parent;
    this.position = position;
    this.g = 0; // Cost from start to node
    this.f = 0; // Total cost (for Dijkstra's, f = g)
  }

  isEqual(other) {
    return (
      this.position.x === other.position.x &&
      this.position.y === other.position.y
    );
  }
}

function dijkstra(grid, start, end) {
  let openList = [];
  let closedList = [];
  let startNode = new Node(null, { x: start.x, y: start.y });
  let endNode = new Node(null, { x: end.x, y: end.y });

  openList.push(startNode);

  while (openList.length > 0) {
    let currentNode = openList[0];
    let currentIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
        currentIndex = i;
      }
    }

    openList.splice(currentIndex, 1);
    closedList.push(currentNode);

    if (currentNode.isEqual(endNode)) {
      let path = [];
      let current = currentNode;
      while (current != null) {
        path.push(current.position);
        current = current.parent;
      }
      return path.reverse();
    }

    let children = [];
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1], // Move Up, Down, Left, Right
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1], // Diagonal movements
    ];

    for (let newPosition of directions) {
      let nodePosition = {
        x: currentNode.position.x + newPosition[0],
        y: currentNode.position.y + newPosition[1],
      };

      if (
        nodePosition.x > grid.length - 1 ||
        nodePosition.x < 0 ||
        nodePosition.y > grid[0].length - 1 ||
        nodePosition.y < 0
      ) {
        continue;
      }

      if (grid[nodePosition.x][nodePosition.y] !== 0) {
        continue;
      }

      let newNode = new Node(currentNode, nodePosition);
      children.push(newNode);
    }

    for (let child of children) {
      if (closedList.find((closedChild) => closedChild.isEqual(child))) {
        continue;
      }

      child.g = currentNode.g + 1;
      child.f = child.g; // For Dijkstra's, f = g

      if (
        openList.find(
          (openNode) => child.isEqual(openNode) && child.g > openNode.g
        )
      ) {
        continue;
      }

      openList.push(child);
    }
  }

  return [];
}

export { dijkstra };
