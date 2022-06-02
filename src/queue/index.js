class Queue {
  constructor(node) {
    this.head = { node, next: null }
    this.length = 1
  }

  push = node => {
    if (!this.head) {
      this.head = { node, next: null }
      this.length++
      return
    }

    let tail = this.head

    while (tail.next != null) {
      tail = tail.next
    }

    tail.next = { node, next: null }
    this.length++
  }

  unshift = () => {
    const nodeObj = this.head
    this.head = this.head.next
    this.length--

    return nodeObj.node
  }
}

export default Queue