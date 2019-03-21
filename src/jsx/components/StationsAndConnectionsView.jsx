import React from 'react';
import { observer } from 'mobx-react';
import { geoPath } from 'd3';
import germany from './germany';

const StationsAndConnectionsView = observer(
  ({
    data, width, height, projection,
  }) => {
    // const lines = data.connections.map(([pos1, pos2]) => {
    //   const [x1, y1] = projection(pos1);
    //   const [x2, y2] = projection(pos2);
    //   return <line x1={x1} y1={y1} x2={x2} y2={y2} key={[pos1, pos2]} />;
    // });

    const fill = geoPath(projection)(germany);

    // const stations = data.stations.map(({ id, label, lat, lon }) => {
    //   const [x, y] = projection([lon, lat]);
    //   return (
    //     <text
    //       dx={x + 10}
    //       dy={y + 10}
    //       key={label}
    //       className={classnames({ selected: uiState.selectedStationId === id })}
    //       onClick={() => uiState.setSelectedStationId(id)}>
    //       {label}
    //     </text>
    //   );
    // });

    return (
      <svg
        style={{ position: 'absolute', display: 'block', zIndex: -1 }}
        width={width}
        height={height}
        className="stations-connections"
      >
        <path
          style={{ fill: 'white' }}
          d={fill}
          key="germany"
          className="country-outline"
        />
        {/* {lines}
      {stations} */}
      </svg>
    );
  },
);

export default StationsAndConnectionsView;
