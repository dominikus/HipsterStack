import React from 'react';
import { observer } from 'mobx-react';
import ReactMapboxGl, {
  Layer,
  Feature,
  Marker,
  GeoJSONLayer,
} from 'react-mapbox-gl';

const MAPBOX_KEY = 'pk.eyJ1IjoibW9yaXR6c3RlZmFuZXIiLCJhIjoiUGs4LU1VZyJ9.oJh_Gi3geralmUvrJVWYaA';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_KEY,
  dragPan: false,
  interactive: true,
});

@observer
class MapboxView extends React.Component {
  render() {
    const {
      layers, center, zoom, bearing, pitch,
    } = this.props;
    console.log(layers);
    // layers.features = layers.features.slice(0, 10);
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
              'fill-extrusion-color': [
                'interpolate',
                ['cubic-bezier', 0, 0.5, 1, 0.5],
                ['get', 'time'],
                0,
                '#2400AB',
                10000,
                '#B6FFFF',
              ],
              'fill-extrusion-opacity': 0.8,
              'fill-extrusion-height': ['*', 5, ['-', 10000, ['get', 'time']]],
            }}
            fillExtrusionLayout={{}}
          />
        </Map>
      </div>
    );
  }
}
export default MapboxView;
