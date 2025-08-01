class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  prepend(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }

  size() {
    return this.length;
  }

  head() {
    return this.head;
  }

  tail() {
    return this.tail;
  }

  at(index) {
    if (index < 0 || index >= this.length) return null;

    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current.next; // point to the next node
      i++;
    }

    return current;
  }

  pop() {
    if (!this.head) return null;

    if (this.length === 1) {
      const node = this.head;
      this.head = this.tail = null;
      this.length = 0;
      return node;
    }

    let current = this.head;
    while (current.next && current.next !== this.tail) {
      current = current.next;
    }

    const popped = this.tail;
    current.next = null;
    this.tail = current;
    this.length--;
    return popped;
  }

  contains(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  find(value) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }

    return null;
  }

  toString() {
    let output = "";
    let current = this.head;
    while (current) {
      output += `( ${current.value} ) -> `;
      current = current.next;
    }
    output += "null";
    return output;
  }

  insertAt(value, index) {
    const node = new Node(value);

    if (index <= 0 || !this.head) {
      // Insert at the beginning
      node.next = this.head;
      this.head = node;
      if (!this.tail) this.tail = node;
      this.length++;
      return;
    }

    if (index >= this.length) {
      // Insert at the end
      this.tail.next = node;
      this.tail = node;
      this.length++;
      return;
    }

    // Insert in the middle
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next;
    }

    node.next = prev.next;
    prev.next = node;
    this.length++;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length || !this.head) return null;

    let removed;

    if (index === 0) {
      removed = this.head;
      this.head = this.head.next;
      if (this.length === 1) this.tail = null;
      this.length--;
      return removed;
    }

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next;
    }

    removed = prev.next;
    prev.next = removed.next;

    if (removed === this.tail) {
      this.tail = prev;
    }

    this.length--;
    return removed;
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());