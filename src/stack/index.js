class Stack {
  constructor(item) {
    this.array = item ? [item] : []
    this.length = this.array.length
  }

  push = item => {
    this.array.push(item)
    this.length++
  }

  pop = () => {
    this.length--
    return this.array.pop()
  }
}

export default Stack
