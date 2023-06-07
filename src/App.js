
import './App.css';
import { Map } from './components/Map/Map';
import { useJsApiLoader } from '@react-google-maps/api';

const API_KEY=process.env.REACT_APP_API_KEY

const defaultValueCenter={
  lat:54.30920403493205,
  lng: 26.87096111598955
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })
  return (
    <div className="App">
      {isLoaded ? <Map center={defaultValueCenter}/> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
