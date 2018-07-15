import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
//import data from './cuisine_geohash.json';
const data =[]

// Set your mapbox token here
const MAPBOX_TOKEN = ""; // eslint-disable-line
const colorMap = {                              
    "north indian" : [213,0,0], 
    "others" : [197,17,98],       
    "continental" : [106,27,154],  
    "south indian" : [101,31,255], 
    "chettinad" : [26,35,126],    
    "mexican" : [144,202,249],      
    "chinese" : [179,229,252],      
    "american" : [224,247,250],     
    "thai" : [0,77,64],         
    "arabian" : [0,200,83],      
    "bengali" : [174,213,129],      
    "kerala" : [205,220,57],       
    "italian" : [255,229,127],      
    "hyderabadi" : [255,255,0],   
    "singapore" : [255,109,0],    
    "andhra" : [93,64,55]       
}


export const INITIAL_VIEW_STATE = {
  longitude: -78.9883,
  latitude:-52.8449,
  zoom: 12,
  maxZoom: 16,
  pitch: 20,
  bearing: 0
};

export class App extends Component {
  _renderLayers() {
    const {
      data,
      radius = 30,

    } = this.props;

    return [
      new ScatterplotLayer({
        id: 'scatter-plot',
        data,
        radiusScale: radius,
        radiusMinPixels: 0.25,
        getPosition: d => [d.location.lon, d.location.lat, 0],
        getColor: d => {
          d.defaultCuisine = 0
          const maxCuisine = Object.keys(colorMap).reduce((maxCuisine, cuisine) => {
              if(d.hasOwnProperty(cuisine)){
                if(d[cuisine] > d[maxCuisine]){
                   maxCuisine = cuisine;
                }
              }
              return maxCuisine;
          },"defaultCuisine");
          return maxCuisine == "defaultCuisine" ? [255,255,255] : colorMap[maxCuisine]
        },
        getRadius: 1
    
      })
    ];
  }

  render() {
    const {viewState, controller = true, baseMap = true} = this.props;

    return (
      <DeckGL
        layers={this._renderLayers()}
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        controller={controller}
      >
        {baseMap && (
          <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/mapbox/light-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        )}
      </DeckGL>
    );
  }
}

export function renderToDOM(container) {
  render(<App data={data} />, container);
  //console.log(data);
  // fetch('http://localhost:3000/data/cuisine_geohash').then((resp) => {
  //   resp.json().then((respData)=> {
  //       data = respData;
  //     console.log(data)
  //   })
  // })

}
