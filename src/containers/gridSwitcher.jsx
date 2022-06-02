import React, { Component } from 'react'

class GridSwitcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shownGridIndex: 0
    }
  }

  nextGrid = () => {
    this.setState(oldState => {
      let { shownGridIndex } = oldState

      shownGridIndex = shownGridIndex === this.props.grids.length - 1 ? 0 : shownGridIndex + 1

      return { shownGridIndex }
    })
  }

  render() {
    const grids = this.props.grids
    const index = this.state.shownGridIndex
    return (
      <>
        {
          grids[index]
        }
        <div className="button"
          id="switchButton"
          onClick={this.nextGrid}>
          Switch Algorithms
        </div>
      </>
    )
  }
}

export default GridSwitcher