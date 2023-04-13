import React, { useState, useEffect } from "react";

const MainPage = () => {
  const [weather, setWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState("");
  const [playlist, setPlaylist] = useState("");

  async function getData() {
    const url = "http://localhost:8000/api/weather/";
    const resp = await fetch(url);

    if (resp.ok) {
      const data = await resp.json();
      setWeather(data.weather);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setCurrentWeather(e.target.value);
    // update selected playlist based on chosen weather condition
    switch (e.target.value) {
      case "Rainy":
        setPlaylist(
          "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ"
        );
        break;
      case "Sunny":
        setPlaylist(
          "https://open.spotify.com/embed/playlist/37i9dQZF1DX6z20IXmBjWI"
        );
        break;
      case "Cloudy":
        setPlaylist(
          "https://open.spotify.com/embed/playlist/37i9dQZF1DX4wta20PHgwo"
        );
        break;
      case "Snowy":
        setPlaylist(
          "https://open.spotify.com/embed/playlist/12iJPEljO246xXZuGVqyaB?si=4dc60c88200849de"
        );
        break;
      default:
        setPlaylist("");
        break;
    }
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
              {weather.map((w) => {
                return (
                  <option value={w.name} key={w.id}>
                    {w.name}
                  </option>
                );
              })}
            </select>
            {playlist !== "" && (
              <iframe
                style={{ borderRadius: "12px" }}
                src={`${playlist}?utm_source=generator&theme=0`}
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
