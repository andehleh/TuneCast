import React, { useState, useEffect, useCallback } from "react";

const MainPage = () => {
  // const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [stateAbr, setStateAbr] = useState([]);
  const [currentStateAbr, setCurrentStateAbr] = useState("");
  const [currentCity, setCurrentCity] = useState("")



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

  for (let playlist of playlists){
    let defaultPlaylist = ""
    if (playlist.weather === "Everything Else"){
      defaultPlaylist = playlist.url
    }
  }

  useEffect(() => {
    console.log(currentWeather)
    console.log(playlists)
    try {
      let weatherName = currentWeather['weather'][0]['main']
      // const defaultPlaylist = playlists

      const findPlaylist = (w) => {
        playlists.map((playlist) => {
          if (playlist.weather === w){
            setCurrentPlaylist(playlist.url)
          }

        })
      }
      findPlaylist(weatherName)
    }
    catch(err) {
      console.log("no current weather")
    }
    console.log("success")
  }, [currentWeather, playlists])

  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Tunecast</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Weather-Based Playlist Generator!</p>
          <div>
            <p>Current Playlist: {currentPlaylist}</p>
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
            {currentPlaylist !== "" && (
                  <iframe
                    title="Spotify Embedded Player"
                    style={{ borderRadius: "12px", margin:'0 25%'}}
                    src={`${currentPlaylist}?utm_source=generator&theme=0`}
                    width="50%"
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
