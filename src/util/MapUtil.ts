//@ts-ignore
import {ScatterplotLayer} from '@deck.gl/layers';

function longitude(record: any) {
  return record.location.longitude;
}

function latitude(item: any) {
  return item.location.latitude;
}

function sum(prev: number, next: number) {
  return prev + next;
}

export function getAverageCoordinates(records: any[]) {
  return {
    longitude: records.map(longitude).reduce(sum) / records.length,
    latitude: records.map(latitude).reduce(sum) / records.length
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