import React, { useEffect, useState } from "react";
import "./Weather.css";

import sun from "../Images/sunImg.png";
import rain from "../Images/rainyImg.png";
import cloud from "../Images/cloudImg.png";

function Weather() {
  const [tempDetails, setTempDetails] = useState({
    City: "",
    Temp: "",
    TempStatus: "",
  });

  const [tempStatus, setTempStatus] = useState();
  const [searchCity, setSearchCity] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/pune?unitGroup=metric&key=F3TMAB79J578SEVBVCJPPVY23&contentType=json"
      );

      const dataJson = await data.json();

      setTempDetails({
        City: dataJson.resolvedAddress,
        Temp: dataJson.currentConditions.temp + "°C",
        TempStatus: dataJson.currentConditions.icon,
      });

      if (
        dataJson.currentConditions.icon === "partly-cloudy-night" ||
        dataJson.currentConditions.icon === "cloudy"
      ) {
        setTempStatus(
          <img src={cloud} alt="" style={{ maxWidth: "100%", width: "10%" }} />
        );
        document.querySelector("body").classList.remove("rain");
        document.querySelector("body").classList.remove("sunny");
        document.querySelector("body").classList.remove("partlyCloud");
        document.querySelector("body").classList.remove("clearDay");
        document.querySelector("body").classList.add("cloud");
      } else if (dataJson.currentConditions.icon === "partly-cloudy-day") {
        setTempStatus(
          <img src={cloud} alt="" style={{ maxWidth: "100%", width: "10%" }} />
        );
        document.querySelector("body").classList.remove("cloud");
        document.querySelector("body").classList.remove("rain");
        document.querySelector("body").classList.remove("sunny");
        document.querySelector("body").classList.remove("clearDay");
        document.querySelector("body").classList.add("partlyCloud");
      } else if (dataJson.currentConditions.icon === "sunny") {
        setTempStatus(
          <img src={sun} alt="" style={{ maxWidth: "100%", width: "10%" }} />
        );
        document.querySelector("body").classList.remove("cloud");
        document.querySelector("body").classList.remove("rain");
        document.querySelector("body").classList.remove("partlyCloud");
        document.querySelector("body").classList.remove("clearDay");
        document.querySelector("body").classList.add("sunny");
      } else if (dataJson.currentConditions.icon === "rain") {
        setTempStatus(
          <img src={rain} alt="" style={{ maxWidth: "100%", width: "20%" }} />
        );

        document.querySelector("body").classList.remove("cloud");
        document.querySelector("body").classList.remove("sunny");
        document.querySelector("body").classList.remove("partlyCloud");
        document.querySelector("body").classList.remove("clearDay");
        document.querySelector("body").classList.add("rain");
      } else {
        document.querySelector("body").classList.remove("cloud");
        document.querySelector("body").classList.remove("sunny");
        document.querySelector("body").classList.remove("rain");
        document.querySelector("body").classList.remove("partlyCloud");
        document.querySelector("body").classList.add("clearDay");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchCity}?unitGroup=metric&key=F3TMAB79J578SEVBVCJPPVY23&contentType=json`
    );
    const dataJson = await data.json();

    console.log(dataJson);
    if (
      dataJson.currentConditions.icon === "partly-cloudy-night" ||
      dataJson.currentConditions.icon === "cloudy"
    ) {
      setTempStatus(
        <img src={cloud} alt="" style={{ maxWidth: "100%", width: "10%" }} />
      );
      document.querySelector("body").classList.remove("rain");
      document.querySelector("body").classList.remove("sunny");
      document.querySelector("body").classList.remove("partlyCloud");
      document.querySelector("body").classList.remove("clearDay");
      document.querySelector("body").classList.add("cloud");
    } else if (dataJson.currentConditions.icon === "partly-cloudy-day") {
      setTempStatus(
        <img src={cloud} alt="" style={{ maxWidth: "100%", width: "10%" }} />
      );
      document.querySelector("body").classList.remove("cloud");
      document.querySelector("body").classList.remove("rain");
      document.querySelector("body").classList.remove("sunny");
      document.querySelector("body").classList.remove("clearDay");
      document.querySelector("body").classList.add("partlyCloud");
    } else if (dataJson.currentConditions.icon === "sunny") {
      setTempStatus(
        <img src={sun} alt="" style={{ maxWidth: "100%", width: "10%" }} />
      );
      document.querySelector("body").classList.remove("cloud");
      document.querySelector("body").classList.remove("rain");
      document.querySelector("body").classList.remove("partlyCloud");
      document.querySelector("body").classList.remove("clearDay");
      document.querySelector("body").classList.add("sunny");
    } else if (dataJson.currentConditions.icon === "rain") {
      setTempStatus(
        <img src={rain} alt="" style={{ maxWidth: "100%", width: "20%" }} />
      );

      document.querySelector("body").classList.remove("cloud");
      document.querySelector("body").classList.remove("sunny");
      document.querySelector("body").classList.remove("partlyCloud");
      document.querySelector("body").classList.remove("clearDay");
      document.querySelector("body").classList.add("rain");
    } else {
      document.querySelector("body").classList.remove("cloud");
      document.querySelector("body").classList.remove("sunny");
      document.querySelector("body").classList.remove("rain");
      document.querySelector("body").classList.remove("partlyCloud");
      document.querySelector("body").classList.add("clearDay");
    }

    if (data.ok) {
      setTempDetails({
        City: dataJson.resolvedAddress,
        Temp: dataJson.currentConditions.temp + "°C",
        TempStatus: dataJson.currentConditions.icon,
      });
    } else {
      setTempDetails({
        Temp: "Data Not Found",
      });
    }
    setSearchCity("");
  };

  return (
    <>
      {/* <!-- Hero1 --> */}
      <div className="container-fluid" data-aos="fade-up">
        <div className="row text-light justify-content-around align-items-center">
          <div className="col-lg-5 col-md-6 col-sm-8 col-12 main">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                name="search"
                placeholder="Search City"
                className="search"
                onChange={handleChange}
                value={searchCity}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
            <div className="details">
              <p className="city">{tempDetails.City}</p>
              <p className="date">
                {new Date().toDateString() +
                  " | " +
                  new Date().toLocaleTimeString()}
              </p>

              <h1 className="temp">{tempDetails.Temp}</h1>
              <h2
                style={{
                  fontVariant: "small-caps",
                  fontStyle: "italic",
                  fontFamily: "cursive",
                }}
              >
                {tempStatus}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
