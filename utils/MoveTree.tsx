export class Node {
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

  static fromString(tree: string, location: string) {
    const move_tree = new MoveTree();
    const str_nodes = tree.split(";");

    for (let i = 1; i < str_nodes.length; i++) {
      const str_node = str_nodes[i];

      // go back before making the new branch if necessary
      const nb_backward = str_node.split("<").length - 1;
      for (let i = 0; i < nb_backward; i++) {
        move_tree.cancelMove();
      }

      // make the move
      const [x, y] = str_node.replaceAll("<", "").split(",");
      if (x && y) move_tree.addMove(Number(x), Number(y));
    }

    const nodes_location = location.split(";");
    for (const node_location of nodes_location) {
      if (!node_location) continue;
      const [x, y] = node_location.split(",");
      if (x && y) move_tree.addMove(Number(x), Number(y));
    }

    return move_tree;
  }
}
