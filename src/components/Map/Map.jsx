
import {React,useState,useCallback,} from 'react'

import {GoogleMap,Marker,useJsApiLoader} from "@react-google-maps/api"

/**
* @author
* @function Map
**/
const containerStyle = {
    width: '400px',
    height: '400px'
  };
  const google = window.google;
  
  const center = new google.maps.LatLng(51.509865,-0.118092)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
export const Map = (props) => {
  return(
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center}/>
      </GoogleMap>
   )
  }
