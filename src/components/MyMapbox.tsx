// https://reactjs.org/docs/hooks-intro.html
import React, { useState } from 'react';

// https://uber.github.io/react-map-gl/#/
import ReactMapGL from 'react-map-gl';

// https://material-ui.com/components/
import { makeStyles } from '@material-ui/core/styles';

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOXAPIACCESSTOKEN;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '90vh',
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

export default function MyMapbox() {

    const classes = useStyles();

    // https://uber.github.io/react-map-gl/#/Documentation/getting-started/get-started
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "90%",
        latitude: 36.1,
        longitude: -75.8,
        zoom: 7,
        bearing: 0,
        pitch: 0,
        maxZoom: 15,
        minZoom: 1,
        zIndex: -1
    });

    return (
        <div className={classes.root}>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={mapboxApiAccessToken}
                mapStyle={"mapbox://styles/tportwood/cjvmxvg9p4hi61co9jllxn4ka"}
                onViewportChange={(viewport: any) => setViewport(viewport)} >

                {/*<DeckGL viewState={viewport} layers={layers} />*/}

            </ReactMapGL>
            <div>{JSON.stringify(viewport)}</div>
        </div>
    );
}