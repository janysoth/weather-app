import React, {useState} from 'react';
import axios from 'axios';
import Clock from "react-live-clock";
function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d5d4f9caa31dc0bc654d876b1d629d6e`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('') // After Search, the input box is empty
    }
  }

    // Add Current Date  
    const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}  ${month} ${date}, ${year}`
  }

  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange = {event => setLocation(event.target.value)}
        placeholder ='Enter Location...'
        onKeyPress = {searchLocation}
        type="text" />
      </div>
      <div className='search'><h2 className='date'>{dateBuilder(new Date())}</h2></div>
      <div className='date'>
        <h3>Current Time:</h3><h3><Clock format="HH:mm:ss" interval={1000} ticking={true}/></h3>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1 className='bold'>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          
        </div>

      {data.name != undefined && 
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'> {data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'> {data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Winds</p>
          </div>
        </div>
      }
      </div>
    </div>
  );
}

export default App;
