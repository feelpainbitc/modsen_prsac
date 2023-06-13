import {useLoadScript} from "@react-google-maps/api"

import './App.css';
import { Map } from "./components/Map/Map";

function App() {
  const {isLoaded}=useLoadScript({
    googleMapsApiKey:process.env.REACT_MAPS_API_KEY,
    id: 'google-map-script',
  })
  if(!isLoaded) return <div>Loading...</div>
  return <div><Map/></div>
}

export default App;
