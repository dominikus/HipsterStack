import React from 'react';
import { observer } from 'mobx-react';
import ReactMapboxGl, {
  Layer,
  Feature,
  Marker,
  GeoJSONLayer,
} from 'react-mapbox-gl';
import { max, scaleLinear, hcl } from 'd3';

const MAPBOX_KEY =
  'pk.eyJ1IjoibW9yaXR6c3RlZmFuZXIiLCJhIjoiUGs4LU1VZyJ9.oJh_Gi3geralmUvrJVWYaA';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_KEY,
  dragPan: true,
  interactive: true,
});

@observer
class MapboxView extends React.Component {
  render() {
    const { layers, center, zoom, bearing, pitch } = this.props;
    const maxTime = max(layers.features, d => d.properties.time);
    console.log(maxTime);

    const heightScale = scaleLinear()
      .domain([0, maxTime])
      .range([30000, 0]);

    const colorScale = scaleLinear()
      .domain([0, maxTime * 0.9, maxTime])
      .range(['#A900C0', '#B6FFFF', '#FFFFFF']);

    layers.features = layers.features.map((l, i) => {
      l.properties.height = heightScale(l.properties.time);
      l.properties.color = colorScale(l.properties.time);
      // if (i % 10 == 0)
      //   l.properties.color = hcl(l.properties.color)
      //     .darker(1.4)
      //     .toString();
      return l;
    });
    // layers.features = layers.features.slice(0, 10);
    // const maxTime = 3300;
    return (
      <div className="content">
        <Map
          // eslint-disable-next-line react/style-prop-object
          // style="mapbox://styles/moritzstefaner/cjoe6zcsq4s3o2rpfhzgfykjy"
          style="mapbox://styles/moritzstefaner/cjsnl91az2ehl1fpes9hmuyi3"
          containerStyle={{
            height: '100%',
            width: '100%',
          }}
          center={center}
          zoom={[zoom]}
          // minZoom={[zoom]}
          // maxZoom={[zoom]}
          pitch={[pitch]}
          bearing={[bearing]}
          movingMethod="jumpTo"
        >
          <GeoJSONLayer
            data={layers}
            fillExtrusionPaint={{
              'fill-extrusion-color': ['get', 'color'],
              'fill-extrusion-opacity': 1,
              'fill-extrusion-height': ['get', 'height'],
            }}
            fillExtrusionLayout={{}}
          />
        </Map>
      </div>
    );
  }
}
export default MapboxView;
