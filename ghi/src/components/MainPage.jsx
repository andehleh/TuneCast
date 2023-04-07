import React, { useState, useEffect } from "react";

const MainPage = () => {

  const [weather, setWeather] = useState([]);

  async function getData() {
    const url = "http://localhost:8000/api/weather/"
    const resp = await fetch(url);

    if (resp.ok) {
      const data = await resp.json();
      console.log(data.weather)
      setWeather(data.weather);

    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Tunecast</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Weather-Based Playlist Generator!</p>
          <div>
            {console.log("Weather: ", weather)}
            <select>
              {weather.map(w => {
                return (
                  <option key={w.id}>{w.name}</option>
                )
              })}
            </select>
          </div>
          <div>
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
