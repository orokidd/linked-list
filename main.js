class ListNode {
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
    const node = new ListNode(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  prepend(value) {
    const node = new ListNode(value);
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

  insertAt(index, value) {
    if (index <= 0) return this.prepend(value);
    if (index >= this.length) return this.append(value);

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.next;

    const node = new ListNode(value);
    node.next = prev.next;
    prev.next = node;
    this.length++;
  }

  removeAt(index) {
    if (!this.head) return undefined;

    if (index <= 0) {
      const val = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return val;
    }

    let prev = this.head;
    for (let i = 0; i < index - 1 && prev.next; i++) prev = prev.next;
    if (!prev.next) return undefined;

    const val = prev.next.value;
    prev.next = prev.next.next;
    if (!prev.next) this.tail = prev;
    this.length--;
    return val;
  }

  find(predicateOrValue) {
    let i = 0, cur = this.head;
    while (cur) {
      const match = (typeof predicateOrValue === "function")
        ? predicateOrValue(cur.value, i)
        : cur.value === predicateOrValue;
      if (match) return cur;
      cur = cur.next; i++;
    }
    return null;
  }

  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) { out.push(cur.value); cur = cur.next; }
    return out;
  }
}

// Example
const list = new LinkedList();
list.append(10);
list.append(20);
list.prepend(5);      // [5, 10, 20]
list.insertAt(2, 15); // [5, 10, 15, 20]
list.removeAt(1);     // removes 10 -> [5, 15, 20]
console.log(list.toArray());
