import React, { Component } from 'react'
import Stack from "../stack"
import Node from "../components/node"
import Cell from "../cell"
import Instructions from "../components/instructions"

class UnknownGrid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      matrix: [],
      start: null,
      end: null,
      noPath: false,
      intId: null
    }

    this.instructions = "This is a Depth-First algorithm used to find a path between two nodes."
  }

  componentDidMount() {
    this.populateMatrix()
  }

  populateMatrix = () => {
    const { height, width } = this.props
    const matrix = []

    for (let r = 0; r < height; r++) {
      const row = []

      for (let c = 0; c < width; c++) {
        const passable = !(Math.floor(Math.random() * 11) < 4)
        const cell = new Cell({
          hidden: true,
          passable,
          row: r,
          col: c
        })

        row.push(cell)
      }

      matrix.push(row)
    }

    this.setState({
      matrix
    }, () => {
      this.setRandomStartAndEnd()
    })
  }

  getCell = (row, col) => {
    return this.state.matrix[row][col]
  }

  randomCell = () => {
    const { height, width } = this.props
    const row = Math.floor(Math.random() * height)
    const col = Math.floor(Math.random() * width)

    return this.getCell(row, col)
  }

  setRandomStartAndEnd = () => {
    const start = this.randomCell()
    const end = this.randomCell()

    if (start === end) {
      return this.setRandomStartAndEnd()
    }

    start.passable = true
    start.hidden = false
    end.passable = true
    end.hidden = false

    this.setState({
      start,
      end
    })
  }

  lookUp = cell => {
    const { row, col } = cell
    const up = row > 0 ? this.state.matrix[row - 1][col] : null

    return up
  }

  lookDown = cell => {
    const { row, col } = cell
    const down = row < this.props.height - 1 ? this.state.matrix[row + 1][col] : null

    return down
  }

  lookLeft = cell => {
    const { row, col } = cell
    const left = col > 0 ? this.state.matrix[row][col - 1] : null

    return left
  }

  lookRight = cell => {
    const { row, col } = cell
    const right = col < this.props.width - 1 ? this.state.matrix[row][col + 1] : null

    return right
  }

  getNextAdjacent = cell => {
    const up = this.lookUp(cell)
    const down = this.lookDown(cell)
    const left = this.lookLeft(cell)
    const right = this.lookRight(cell)

    let candidates = [up, down, left, right].filter(cell => cell && !cell.visited)

    const endCell = candidates.filter(cell => cell === this.state.end)

    return endCell.length > 0 ? endCell[0] : candidates[Math.floor(Math.random() * candidates.length)]
  }

  nextStep = cell => {
    const adj = this.getNextAdjacent(cell)
    if (adj) {
      if (adj !== this.state.start && adj !== this.state.end) {
        adj.toggleHidden()
        this.setState(this.state)
      }
    } else {
      return null
    }

    if (!adj.passable) {
      adj.setVisited()
      return this.nextStep(cell)
    } else {
      return adj
    }
  }

  start = () => {
    const stack = new Stack(this.state.start)
    let currentCell = this.state.start
    currentCell.setVisited()

    const intId = setInterval(() => {
      const noPath = !currentCell

      this.setState({ noPath, intId })

      if (noPath || currentCell === this.state.end) {
        return clearInterval(intId)
      }

      const nextCell = this.nextStep(currentCell)

      if (!nextCell) {
        currentCell.togglePassed()
        currentCell = stack.pop()
        return
      } else {
        stack.push(currentCell)
        currentCell = nextCell
        currentCell.setVisited()
        currentCell.togglePassed()
      }

      this.setState(this.state)
    }, 250);
  }

  onStartClick = () => {
    this.start()
  }

  onResetClick = () => {
    clearInterval(this.state.intId)
    this.populateMatrix()
  }

  render() {
    let rowNum = 0
    return (
      <div className="grid">
        {
          this.state.matrix.map(row => {
            rowNum++
            return (
              <div className="row"
                key={rowNum}>
                {
                  row.map(cell => {
                    return <Node
                      key={`${cell.row}${cell.col}`}
                      passed={cell.passed}
                      passable={cell.passable}
                      start={cell === this.state.start}
                      end={cell === this.state.end}
                      hidden={cell.hidden}
                    />
                  })
                }
              </div>
            )
          })
        }
        {
          <Instructions text={this.instructions} />
        }
        <div className="buttonRow">
          <div className="button"
            onClick={() => { this.onStartClick() }}>Start</div>
          <div className="button"
            onClick={() => { this.onResetClick() }}>Reset</div>
        </div>
      </div>
    )
  }
}

export default UnknownGrid