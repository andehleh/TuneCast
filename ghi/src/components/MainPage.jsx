import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, Link } from "react-router-dom";
import { encode as base64_encode } from "base-64";

const MainPage = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [stateAbr, setStateAbr] = useState([]);
  const [currentStateAbr, setCurrentStateAbr] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentCoords, setCurrentCoords] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [accessToken, setAccessToken] = useState("")
  const { token, fetchWithToken } = useToken();
  const navigate = useNavigate();

  async function getData() {
    const playlistUrl = "http://localhost:8000/api/playlist/";
    const stateUrl = "http://localhost:8000/api/state/";
    const playlistResp = await fetch(playlistUrl);
    const stateResp = await fetch(stateUrl);

    if (stateResp.ok && playlistResp.ok) {
      const playlistData = await playlistResp.json();
      const stateData = await stateResp.json();
      setPlaylists(playlistData.playlist);
      setStateAbr(stateData.state);
    }
  }

  function RandomNum(num) {
      if (num > 10){
        num = 10
      }
        var maxNumber = num;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
        return randomNumber;
      }

  useEffect(() => {
    const getSpotifyToken = async () => {

      const spotifyUrl = "http://localhost:8000/api/spotifyToken/";
      const response = await fetch(spotifyUrl);
      console.log("%%%%%%%%%%%%%%%%%%%%%", response);
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token)
        console.log("******************TOKEN", data.access_token);
      }
    };
    getSpotifyToken()
    getData();
  }, []);


  useEffect(() => {
    const getSpotifyPlaylists = async () => {
      // console.log("access token:", accessToken)
      // console.log()
      try {
        const spotifySearchUrl = `http://localhost:8000/api/spotifySearch/${accessToken}/${currentWeather["weather"][0]["main"]}/`;
        const response = await fetch(spotifySearchUrl);
        console.log("%%%%%%%%%%%%%%%%%%%%%", response);
        if (response.ok) {
          const data = await response.json();
          const randomNumber = RandomNum(data.playlists.total)
          console.log("******************RANDOM NUMBER:", randomNumber)
          const playlistUrl = data.playlists.items[randomNumber-1]['external_urls']['spotify']
          // const playlistEmbed = `${playlistUrl.slice(0,25)}embed/${playlistUrl.slice(25)}`
          setCurrentPlaylist(playlistUrl)
          console.log("******************PLAYLIST", data);
        }
      }
      catch(err){
        return
      }
    };
    getSpotifyPlaylists()
  }, [currentWeather]);



  const handleCity = (e) => {
    const city = e.target.value;
    setCurrentCity(city);
  };

  const handleState = (e) => {
    const state = e.target.value;
    setCurrentStateAbr(state);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const weatherUrl = `http://localhost:8000/api/open_weather_api/${currentCity}/${currentStateAbr}/`;
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      const location = {
        city: currentCity.toUpperCase(),
        principalSubdivisionCode: currentStateAbr,
      };
      console.log("LOCATION: ", location);
      setCurrentWeather(data);
      setCurrentLocation(location);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const weather = currentWeather["weather"][0]["main"];
        const historyUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/history/`;
        const historyData = {
          date: new Date().toLocaleDateString(),
          weather: weather,
          playlist: currentPlaylist,
        };
        const historyHeaders = {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`
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
            console.log("History Saved");
          }
        }
      } catch (err) {
        return;
      }
    })();
  }, [currentPlaylist]);

  // useEffect(() => {
  //   // console.log(playlists)

  //   let defaultPlaylist = "";
  //   for (let playlist of playlists) {
  //     if (playlist.weather === "Everything Else") {
  //       defaultPlaylist += playlist.url;
  //     }
  //   }

  //   try {
  //     let weatherName = currentWeather["weather"][0]["main"];
  //     console.log("******************", playlists);
  //     const findPlaylist = (w) => {
  //       for (let playlist of playlists) {
  //         if (playlist.weather === w) {
  //           setCurrentPlaylist(playlist.url);
  //           break;
  //         } else {
  //           setCurrentPlaylist(defaultPlaylist);
  //         }
  //       }
  //     };
  //     findPlaylist(weatherName);
  //   } catch (err) {
  //     return;
  //   }
  // }, [currentWeather, playlists]);

  const handleLocation = () => {
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
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      setCurrentCoords(lonLat);

      const locationUrl = `http://localhost:8000/api/open_weather_api/${crd.longitude}_${crd.latitude}`;
      const response = await fetch(locationUrl);
      console.log("&&&&&&&&&&&&&&&&&&&", response);
      if (response.ok) {
        const data = await response.json();
        setCurrentWeather(data);
      }
      const currentLocationUrl = `http://localhost:8000/api/location/${crd.longitude}_${crd.latitude}`;
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
        console.log("CURRENT LOCATION: ", data);
      }
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  // const handleSpotifyToken = async () => {

  //   const spotifyUrl = "http://localhost:8000/api/spotifyToken/";
    // const settings = { method: "post" };
    //   "form": {
    //     "code": code,
    //     "redirect_uri": process.env.PUBLIC_URL,
    //     "grant_type": "authorization_code"
    //   },
    //   "headers": {
    //     "Authorization": "Basic " + b64,
    //     'Content-type': 'application/x-www-form-urlencoded'
    //   },
    //   "json": true
    //   }
    // const fetchConfig = {
    //   method: "PUT",
    //   body:{"public": false}
    // }
  //   const response = await fetch(spotifyUrl);
  //   console.log("%%%%%%%%%%%%%%%%%%%%%", response);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setAccessToken(data.access_token)
  //     console.log("******************TOKEN", data.access_token);
  //   }
  // };


  const handleSpotifySearch = async () => {
    const spotifySearchUrl = `http://localhost:8000/api/spotifySearch/${accessToken}/${currentWeather["weather"][0]["main"]}/`;
    const response = await fetch(spotifySearchUrl);
    console.log("%%%%%%%%%%%%%%%%%%%%%", response);
    if (response.ok) {
      const data = await response.json();
      // setAccessToken(data.access_token)
      console.log("******************PLAYLISTS", data);
    }
  };

  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Tunecast</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Weather-Based Playlist Generator!</p>
          <div>
            {currentLocation && (
              <p>
                Current Location: {currentLocation.city},{" "}
                {currentLocation.principalSubdivisionCode}
              </p>
            )}

            <div className="input-group mb-3">
              <input
                onChange={handleCity}
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
              />
              <select
                onChange={handleState}
                className="custom-select"
                id="inputGroupSelect03"
              >
                <option value="">Select Your State</option>
                {stateAbr.map((state) => {
                  return (
                    <option value={state.abr} key={state.id}>
                      {state.abr}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                onClick={handleLocation}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
          {currentPlaylist && <p>Current Playlist: {currentPlaylist}</p>}
          <Link
            to={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/spotifyLogin/`}
          >
            Login to Spotify
          </Link>
          <button
            onClick={handleSpotifySearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Spotify Playlists
          </button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
