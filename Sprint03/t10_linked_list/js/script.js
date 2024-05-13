class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(data) {
    const newNode = { data, next: null };
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  remove(data) {
    if (this.head === null) return false;
    if (this.head.data === data) {
      this.head = this.head.next;
      this.length--;
      return true;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.length--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  contains(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) return true;
      current = current.next;
    }
    return false;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  count() {
    return this.length;
  }

  log() {
    console.log([...this].join(", "));
  }
}

function createLinkedList(arr) {
  const ll = new LinkedList();
  for (const data of arr) {
    ll.add(data);
  }
  return ll;
}
