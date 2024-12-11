import React, { useEffect, useRef, useState } from 'react'
import "./weather.css"
import searchIcon from "../assets/search.png"
import clearIcon from "../assets/clear.png"
import cloudIcon from "../assets/cloud.png"
import drizzleIcon from "../assets/drizzle.png"
import humidityIcon from "../assets/humidity.png"
import rainIcon from "../assets/rain.png"
import snowIcon from "../assets/snow.png"
import windIcon from "../assets/wind.png"



const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon
    }
    const search = async(city) => {
        if(city === ""){
            alert("Enter city name")
            return
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url)
            const data = await response.json()
            if(!response.ok){
                alert(data.message)
                return
            }
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clearIcon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }
        catch(error){
            setWeatherData(false)
            console.log("Error in fetching weather data")
        }
    }
    useEffect(() => {
        search("sydney")
    },[])



  return (
    <div className='weather'>
      <div className="search_bar">
        <input ref={inputRef} type="text" placeholder='Search cities' />
        <img src={searchIcon} alt="" srcset="" onClick={() => search(inputRef.current.value)}/>
      </div>
      {weatherData? <>
      <img src={weatherData.icon} alt="" srcset="" className='weather_icon'/>
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather_data">
        <div className="col">
            <img src={humidityIcon} alt="" srcset="" />
            <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={windIcon} alt="" srcset="" />
            <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
    </div>
  )
}

export default Weather
