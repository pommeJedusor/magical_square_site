class Node {
  x: number;
  y: number;
  depth: number;
  parent: Node | undefined;
  children: Node[];
  constructor(x: number, y: number, depth: number, parent: Node | undefined) {
    this.x = x;
    this.y = y;
    this.depth = depth;
    this.parent = parent;
    this.children = [];
  }
}

export class MoveTree {
  root: Node;
  current: Node;
  constructor() {
    this.root = new Node(0, 0, 1, undefined);
    this.current = this.root;
  }

  cancelMove() {
    if (this.current.parent !== undefined) {
      this.current = this.current.parent;
    }
  }

  addMove(x: number, y: number) {
    const same_move = this.current.children.find((el) => el.x === x && el.y === y)
    if (same_move) {
      this.current = same_move;
    }
    else {
      const new_move = new Node(x, y, this.current.depth + 1, this.current);
      this.current.children.push(new_move);
      this.current = new_move;
    }
  }
}
