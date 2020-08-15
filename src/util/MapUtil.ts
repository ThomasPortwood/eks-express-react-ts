//@ts-ignore
import {ScatterplotLayer} from '@deck.gl/layers';

function location(record: any) {
  return record.location;
}

function maxCoordinate(prev: any, next: any) {
  return {
    longitude: Math.max(prev.longitude, next.longitude),
    latitude: Math.max(prev.latitude, next.latitude)
  }
}

function minCoordinate(prev: any, next: any) {
  return {
    longitude: Math.min(prev.longitude, next.longitude),
    latitude: Math.min(prev.latitude, next.latitude)
  }
}

export function getCenterCoordinates(records: any[]) {
  const max = records.map(location).reduce(maxCoordinate);
  const min = records.map(location).reduce(minCoordinate);
  return {
    longitude: (max.longitude + min.longitude) / 2,
    latitude: (max.latitude + min.latitude) / 2
  }
}

export function createScatterPlotLayer(data: any[]) {
  return new ScatterplotLayer({
    data,
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
}