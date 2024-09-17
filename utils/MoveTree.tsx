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

  toString(): string {
    if (!this.parent) return "";
    return this.parent.toString() + `${this.x},${this.y};`;
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
    const index_same_move = this.current.children.findIndex((el) => el.x === x && el.y === y)

    if (index_same_move === -1) {
      const new_move = new Node(x, y, this.current.depth + 1, this.current);
      this.current.children.push(new_move);
      this.current = new_move;
      return
    }

    // remove the child if found and put it at the end
    this.current = this.current.children.splice(index_same_move, 1)[0];
    this.current.parent?.children.push(this.current);
  }

  // "{x},{y};<{x},{y};"
  // the '<' means go back from one (if there is multiple following go back of the number)
  toString(node: Node = this.root): string {
    let str = `${node.x},${node.y};`;
    for (let i = 0; i < node.children.length; i++) {
      str += this.toString(node.children[i]) + "<";
    }
    return str;
  }
}
