// https://reactjs.org/docs/hooks-intro.html
import React, {useState} from 'react';
// https://uber.github.io/react-map-gl/#/
import ReactMapGL from 'react-map-gl';
// https://material-ui.com/components/
import {makeStyles} from '@material-ui/core/styles';
// https://deck.gl/docs/api-reference/layers/scatterplot-layer
// @ts-ignore
import DeckGL from '@deck.gl/react';
// @ts-ignore
import {ScatterplotLayer} from '@deck.gl/layers';

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOXAPIACCESSTOKEN;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '60vh',
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1)
  },
  slider: {
    padding: '20px 0px',
  },
  controls: {
    position: 'absolute',
    padding: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

interface input {
  record: any
}

export default function MyMapbox(props: input) {

  const classes = useStyles();

  // https://uber.github.io/react-map-gl/#/Documentation/getting-started/get-started
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: props.record.location.latitude,
    longitude: props.record.location.longitude,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    maxZoom: 15,
    minZoom: 1,
    zIndex: -1
  });

  const layers: any = [];

  if (props.record) {
    layers.push(
      new ScatterplotLayer({
        data: [props.record],
        getFillColor: [255, 140, 0],
        getPosition: (d: any) => [d.location.longitude, d.location.latitude],
        id: 'scatterplot-layer',
        filled: true,
        opacity: 1.0,
        radiusScale: 6,
        radiusMinPixels: 10,
        radiusMaxPixels: 100,
        lineWidthMinPixels: 1,
        stroked: true
      })
    )
  }

  return (
    <div className={classes.root}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapboxApiAccessToken}
        mapStyle={"mapbox://styles/tportwood/cjvmxvg9p4hi61co9jllxn4ka"}
        onViewportChange={(viewport: any) => setViewport({
          ...viewport,
          width: viewport.width === 0 ? "100%" : viewport.width,
          height: viewport.height === 0 ? "100%" : viewport.height,
        })}>
        <DeckGL viewState={viewport} layers={layers} />
      </ReactMapGL>
    </div>
  );
}