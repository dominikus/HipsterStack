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
  interactive: false,
});

@observer
class MapboxView extends React.Component {
  render() {
    const {
      layers, center, zoom, bearing, pitch,
    } = this.props;
    console.log(layers);
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
            // fillLayout={{}}
            // fillPaint={{ 'fill-color': '#990000' }}
            
          />
        </Map>
      </div>
    );
  }
}
export default MapboxView;
