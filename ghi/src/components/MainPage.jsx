import React, { useState, useEffect} from "react";

const MainPage = () => {
  // const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [stateAbr, setStateAbr] = useState([]);
  const [currentStateAbr, setCurrentStateAbr] = useState("");
  const [currentCity, setCurrentCity] = useState("")
  const [currentCoords, setCurrentCoords] = useState()
  const [currentLocation, setCurrentLocation] = useState()



  async function getData() {
    // const weatherUrl = "http://localhost:8000/api/weather/";
    const playlistUrl = "http://localhost:8000/api/playlist/";
    const stateUrl = "http://localhost:8000/api/state/";
    // const weatherResp = await fetch(weatherUrl);
    const playlistResp = await fetch(playlistUrl);
    const stateResp = await fetch(stateUrl);

    if (stateResp.ok && playlistResp.ok) {
      // const weatherData = await weatherResp.json();
      const playlistData = await playlistResp.json();
      const stateData = await stateResp.json();
      // setWeather(weatherData.weather);
      setPlaylists(playlistData.playlist);
      setStateAbr(stateData.state)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleCity = (e) => {
    const city = e.target.value
    setCurrentCity(city);
    // const weather = e.target.value
    // setCurrentWeather(weather);

    // const findPlaylist = (w) => {
    //   playlists.map((playlist) => {
    //     if (playlist.weather === w){
    //       setCurrentPlaylist(playlist.url)
    //     }
    //   })
    // }
    // findPlaylist(e.target.value)


  };

  const handleState = (e) => {
    const state = e.target.value;
    setCurrentStateAbr(state);
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const weatherUrl = `http://localhost:8000/api/open_weather_api/${currentCity}/${currentStateAbr}`;
    const response = await fetch(weatherUrl)
    if (response.ok) {
      const data = await response.json()
      setCurrentWeather(data)

      // let weather = data['weather'][0]['main']
      // console.log(e.target.value)

      // update selected playlist based on chosen weather condition
    //   switch (weather) {
    //     case "Clouds":
    //       setCurrentPlaylist(weather);
    //       break;
    //     default:
    //       setCurrentPlaylist("");
    //       break;
    //   }
    }
  };


  useEffect(() => {
    console.log("******************", currentWeather)
    // console.log(playlists)

    let defaultPlaylist = ""
    for (let playlist of playlists){
      if (playlist.weather === "Everything Else"){
        defaultPlaylist+=playlist.url
      }
    }

    try {
      let weatherName = currentWeather['weather'][0]['main']

      const findPlaylist = (w) => {
        for (let playlist of playlists){
          if (playlist.weather === w){
            setCurrentPlaylist(playlist.url)
            break;
          }
          else {
            setCurrentPlaylist(defaultPlaylist)
          }
        }
      }
      findPlaylist(weatherName)
      // setCurrentLocation()
    }
    catch(err) {
      console.log("no current weather")
    }
    // console.log("success")
  }, [currentWeather, playlists])

  const handleLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;
      const lonLat = {
        "lon": crd.longitude,
        "lat": crd.latitude
      }
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      setCurrentCoords(lonLat)

      const locationUrl = `http://localhost:8000/api/open_weather_api/${crd.longitude}_${crd.latitude}`;
      const response = await fetch(locationUrl)
        if (response.ok) {
          const data = await response.json()
          setCurrentWeather(data)
        }
      const currentLocationUrl = `http://localhost:8000/api/location/${crd.longitude}_${crd.latitude}`;
      const currentLocationresponse = await fetch(currentLocationUrl)
        if (currentLocationresponse.ok) {
          const currentLocationData = await currentLocationresponse.json()
          setCurrentLocation(currentLocationData)
          console.log("CURRENT LOCATION: ", currentLocationData)
        }
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Tunecast</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Weather-Based Playlist Generator!</p>
          <div>
            <p>Current Playlist: {currentPlaylist}</p>
            <p>Current Location: {currentLocation ? (`${currentLocation.city}, ${currentLocation.principalSubdivision}`): ""}</p>
            <p>Current Coords: {currentCoords ? (`${currentCoords.lon}, ${currentCoords.lat}`): ""}</p>
            <input onChange={handleCity} type="text"></input>
            <select onChange={handleState}>
              <option value="">Select Your State</option>
              {stateAbr.map((state) => {
                return (
                  <option value={state.abr} key={state.id}>
                    {state.abr}
                  </option>
                );
              })}
            </select>
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
            <button onClick={handleLocation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Use Current Location
            </button>
            {currentPlaylist !== "" && (
                  <iframe
                    title="Spotify Embedded Player"
                    style={{ borderRadius: "12px"}}
                    src={`${currentPlaylist}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
