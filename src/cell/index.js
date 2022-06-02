class Cell {
  constructor(options) {
    this.row = options.row
    this.col = options.col
    this.passable = options.passable === null ? true : options.passable
    this.passed = false
    this.distance = null
    this.hidden = options.hidden || false
    this.visited = false
  }

  togglePassable = () => {
    this.passable = !this.passable
  }

  togglePassed = () => {
    this.passed = !this.passed
  }

  setDistance = distance => {
    this.distance = distance
  }

  setVisited = () => {
    this.visited = true
  }

  toggleHidden = () => {
    this.hidden = !this.hidden
  }
}

export default Cell