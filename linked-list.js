/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  _get(idx) {
    let current = this.head;
    let count = 0;

    while(current !== null && count !== idx) {
      count++;
      current = current.next;
    }

    return current;
  }  

  
  push(val) {
    const newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length = this.length + 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.length = this.length + 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let current = this.head;
    let count = 0;

    while(current !== null && count !== idx) {
      count++;
      current = current.next;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    const node = this._get(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    if (idx === 0) {
      return this.unshift(val);
    }

    if (idx === this.length) {
      return this.push(val);
    }

    const prev = this._get(idx - 1);

    newNode.next = prev.next;
    prev.next = newNode;
    this.length = this.length + 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error('Index is invalid.')
    }

    if (idx === 0) {
      let returnedVal = this.head.val;
      this.head = this.head.next;
      this.length = this.length - 1;
      if (this.length <= 1) {
        this.tail = this.head
      }
      return returnedVal;
    }

    let prev = this._get(idx - 1);

    if (idx === this.length - 1) {
      let returnedVal = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length = this.length - 1;
      return returnedVal;
    }

    let returnedVal = prev.next.val;
    prev.next = prev.next.next;
    this.length = this.length - 1;
    return returnedVal;
  }

  /** average(): return an average of all values in the list */

  average() {
    let current = this.head;
    let sum = 0;
    let count = 0;

    while(current !== null) {
      sum += current.val;
      count++;
      current = current.next;
    }

    if (count === 0) {
      return 0;
    }

    return sum / count;
  } 
}

module.exports = LinkedList;
