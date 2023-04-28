import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, Link } from "react-router-dom";
import { encode as base64_encode } from "base-64";
import { stateList } from './StateList.jsx'
import { makeItRain } from './rain.js'
import imageContent from './music-cloud.png'



const MainPage = () => {

  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
  // const [stateAbr, setStateAbr] = useState([]);
  const [currentStateAbr, setCurrentStateAbr] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentCoords, setCurrentCoords] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [accessToken, setAccessToken] = useState("")
  const [currentWeather, setCurrentWeather] = useState("");
  const { token, fetchWithToken } = useToken();
  const navigate = useNavigate();

  // async function getData() {
  //   const playlistUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/playlist/`;
  //   const stateUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/state/`;
  //   const playlistResp = await fetch(playlistUrl);
  //   const stateResp = await fetch(stateUrl);

  //   if (stateResp.ok && playlistResp.ok) {
  //     const playlistData = await playlistResp.json();
  //     const stateData = await stateResp.json();
  //     setPlaylists(playlistData.playlist);
  //     setStateAbr(stateData.state);
  //   }
  // }

  function RandomNum(num) {
      if (num > 10){
        num = 10
      }
        var maxNumber = num;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
        return randomNumber;
      }

// ------Handle Changes------

  const handleCity = (e) => {
    const city = e.target.value;
    setCurrentCity(city);
  };

  const handleState = (e) => {
    const state = e.target.value;
    setCurrentStateAbr(state);
  };

// ------Handle Clicks------

  // Get Weather based on input City/State Abbreviation
  const handleInputLocation= async (e) => {
    e.preventDefault();
    const weatherUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/open_weather_api/${currentCity}/${currentStateAbr}/`;
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      const location = {
        city: currentCity.toUpperCase(),
        principalSubdivisionCode: currentStateAbr,
      };
      setCurrentWeather(data);
      setCurrentLocation(location);
    //   console.log("LOCATION: ", location);
    //   console.log("WEATHER: ", data)
    }
  };

  // Get Weather based on Current Location
  const handleCurrentLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;
      const lonLat = {
        lon: crd.longitude,
        lat: crd.latitude,
      };
      setCurrentCoords(lonLat);

      const locationUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/open_weather_api/${crd.longitude}_${crd.latitude}`;
      const response = await fetch(locationUrl);
      if (response.ok) {
        const data = await response.json();
        setCurrentWeather(data["weather"][0]["main"]);
      }
      const currentLocationUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/location/${crd.longitude}_${crd.latitude}`;
      const currentLocationresponse = await fetch(currentLocationUrl);
      if (currentLocationresponse.ok) {
        const currentLocationData = await currentLocationresponse.json();
        const cityUpper = currentLocationData["city"].toUpperCase();
        const stateSlice =
          currentLocationData["principalSubdivisionCode"].slice(3);
        const data = {
          city: cityUpper,
          principalSubdivisionCode: stateSlice,
        };
        setCurrentLocation(data);
      }
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };


  // const handleSpotifySearch = async () => {
  //   const spotifySearchUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/spotifySearch/${accessToken}/${currentWeather}/`;
  //   const response = await fetch(spotifySearchUrl);
  //   if (response.ok) {
  //     const data = await response.json();
  //   }
  // };

  // ------USEEFFECTS-----

  // Fetch Spotify Access Token
  useEffect(() => {
    const getSpotifyToken = async () => {

      const spotifyUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/spotifyToken/`;
      const response = await fetch(spotifyUrl);
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token)
      }
    };
    getSpotifyToken()
    // getData();
  }, []);

  // Fetch Spotify Playlists
  useEffect(() => {
  const getSpotifyPlaylists = async () => {
    try {
      const spotifySearchUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/spotifySearch/${accessToken}/${currentWeather}/`;
      const response = await fetch(spotifySearchUrl);
      if (response.ok) {
        const data = await response.json();
        const randomNumber = RandomNum(data.playlists.total)
        const playlistUrl = data.playlists.items[randomNumber-1]['external_urls']['spotify']
        setCurrentPlaylist(playlistUrl)
      }
    }
    catch(err){
      return
    }
  };
  getSpotifyPlaylists()
  }, [currentWeather]);

  //  Post Current Playlist and Weather to History
  useEffect(() => {
    (async () => {
      try {
        const weather = currentWeather;
        const historyUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/history/`;
        const historyData = {
          date: new Date().toLocaleDateString(),
          weather: weather,
          playlist: currentPlaylist,
        };
        const historyHeaders = {
          "Content-Type": "application/json",
        };
        const historyOptions = {
          body: JSON.stringify(historyData),
        };

        if (token) {
          const response = await fetchWithToken(
            historyUrl,
            "POST",
            historyHeaders,
            historyOptions
          );
          if (response.ok) {
          }
        }
      } catch (err) {
        return;
      }
    })();
  }, [currentPlaylist]);



// Rain Function
makeItRain()





  return (
    <>
      {currentWeather === "Clear" &&
        <div id="sun">
          <div id="rings">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      }

      { currentWeather !== "" && currentWeather !== "Clear" &&
      <div className="rain front-row"></div>
      }
      <div className="rain back-row"></div>
      <div
      className="card mb-3 px-4 py-5 my-5 text-center shadow"
      style={{
        width: '50vw',
        margin: '0 0 0 25vw',
        backgroundColor: 'rgba(252, 252, 252, 0.4)'
        }}>
        <h1 className="display-5 fw-bold">
          <Link className="navbar-brand" href="#">
            <img src={imageContent} width="80" height="80" className="d-inline-block align-top" alt="TuneCast"/>
          </Link>
          TuneCast
          </h1>
        <div className="col-lg-6 mx-auto" style={{width: '90%'}}>
          <p className="lead mb-4">Weather-Based Playlist Generator!</p>
          <div>
            {currentLocation && (
              <p>
                Current Location: {currentLocation.city},{" "}
                {currentLocation.principalSubdivisionCode}
              </p>
            )}

            <div className="input-group mb-3 ">
              <input
                onChange={handleCity}
                type="text"
                placeholder="Enter Your City"
                className="form-control border border-dark"
                aria-label="Text input with dropdown button"
              />
              <select
                onChange={handleState}
                className="custom-select me-3 border border-dark"
                id="inputGroupSelect03"
              >
                <option value="">Select Your State</option>
                {stateList.map((state) => {
                  return (
                    <option value={state} key={state}>
                      {state}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={handleInputLocation}
                className="bg-blue-500 hover:bg-blue-700 me-3 text-black font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                onClick={handleCurrentLocation}
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              >
                Use Current Location
              </button>
            </div>

            {currentPlaylist !== "" && (
              <iframe
                title="Spotify Embedded Player"
                style={{ borderRadius: "12px" }}
                src={`${currentPlaylist.slice(0,25)}embed/${currentPlaylist.slice(25)}?utm_source=generator&theme=0`}
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
