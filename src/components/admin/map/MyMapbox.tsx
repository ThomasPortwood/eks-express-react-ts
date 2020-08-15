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
import {Error, Loading, useQueryWithStore} from 'react-admin';
import {createScatterPlotLayer, getAverageCoordinates} from "../../../util/MapUtil";

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOXAPIACCESSTOKEN;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '40vh',
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

interface MyMapboxInput {
  records: any[]
  record: any
}

export default function MyMapbox() {

  const classes = useStyles();
  const [properties, setProperties] = useState([]);
  const [layers, setLayers] = useState([]);

  // https://uber.github.io/react-map-gl/#/Documentation/getting-started/get-started
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    maxZoom: 15,
    minZoom: 1,
    zIndex: -1
  });

  // https://marmelab.com/react-admin/Actions.html
  const {loaded, error} = useQueryWithStore(
    {
      type: 'getList',
      resource: 'properties',
    },
    {
      onSuccess: ({data}: any) => {
        const {longitude, latitude} = getAverageCoordinates(data);
        const layers = createScatterPlotLayer(data);
        setViewport({...viewport, longitude, latitude});
        setLayers(layers);
      }
    }
  );

  if (!loaded) { return <Loading />; }
  if (error) { return <Error />; }

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
        <DeckGL viewState={viewport} layers={layers}/>
      </ReactMapGL>
    </div>
  );
}