import { useState, useEffect } from "react";

const MainPage = () => {

  const [weather, setWeather] = useState([]);

  async function getData() {
    const resp = await fetch("http://localhost:8000/api/weather/");
    if (resp.ok) {
      const data = await resp.json();
      console.log(data.weather)
      setWeather(data.weather);
      console.log(weather)
    }
  }

  useEffect(() => {
    getData();
    console.log(weather)
  }, []);


  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Tunecast</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Weather-Based Playlist Generator!</p>
          <div>
            <select>
              <option>Sunny</option>
              <option>Rainy</option>
              <option>Cloudy</option>
              <option>Snowy</option>
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
