import React from 'react';
import KnownGrid from './containers/knownGrid'
import UnknownGrid from "./containers/unknownGrid"
import GridSwitcher from "./containers/gridSwitcher"

function App() {
  return (
    <div className="main">
      <h1 className="title">Pathfinding Algorithms</h1>
      <div className="container">
        <GridSwitcher
          grids={[<KnownGrid height={15}
            width={15} />,
          <UnknownGrid
            height={15}
            width={15}
          />]} />
      </div>
    </div>
  )
}

export default App;
