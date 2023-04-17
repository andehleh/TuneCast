import React, { useState, useEffect } from "react";

const MainPage = () => {
  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);

  async function getData() {
    const weatherUrl = "http://localhost:8000/api/weather/";
    const playlistUrl = "http://localhost:8000/api/playlist/";
    const weatherResp = await fetch(weatherUrl);
    const playlistResp = await fetch(playlistUrl);

    if (weatherResp.ok && playlistResp.ok) {
      const weatherData = await weatherResp.json();
      const playlistData = await playlistResp.json();
      setWeather(weatherData.weather);
      setPlaylists(playlistData.playlist);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const weather = e.target.value
    setCurrentWeather(weather);

    const findPlaylist = (w) => {
      playlists.map((playlist) => {
        if (playlist.weather === w){
          setCurrentPlaylist(playlist.url)
        }
      })
    }
    findPlaylist(e.target.value)

    // update selected playlist based on chosen weather condition
    // switch (weather) {
    //   case weather:
    //     setCurrentPlaylist(weather);
    //     break;
    //   default:
    //     setCurrentPlaylist("");
    //     break;
    // }
  };

  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Tunecast</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Weather-Based Playlist Generator!</p>
          <div>
            <p>Current Weather: {currentWeather}</p>
            <select onChange={handleChange}>
              <option value="">Select Your Weather</option>
              {weather.map((w) => {
                return (
                  <option value={w.name} key={w.id}>
                    {w.name}
                  </option>
                );
              })}
            </select>
                {currentPlaylist !== "" && (
                  <iframe
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
