import {useEffect, useState} from 'react'
import Moment from 'react-moment'

const Data = () => {
  const dayTheme = " from-orange-300 to-orange-400"
  const nightTheme = " from-purple-600 to-purple-900"

  const [location, setLocation] = useState('')
  const [degrees, setDegrees] = useState(0)
  const [condition, setCondition] = useState('')
  const [city, setCity] = useState('seoul')
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [theme, setTheme] = useState(dayTheme)

  const backgroundClass = "w-screen h-screen flex flex-col items-center bg-gradient-to-r";
  
  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather()
  }

  useEffect(() => {
    getWeather()
  }, [])

  const getWeather = async() => {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}&aqi=yes`)
                .then((response) => {
                  return response.json()
                })
   
    if(data.error) {
      setIsErrorVisible(true)
      return
    }
     
    setLocation(data.location)
    setDegrees(data.current)
    setCondition(data.current.condition)
    setTheme(data.current.is_day === 1 ? dayTheme : nightTheme)
    setIsErrorVisible(false)
  }
 
  return (
       
        <div className={backgroundClass + theme}>
          <Moment format="HH:mm" className='text-3xl mt-2'>{location.localtime}</Moment>
          <form onSubmit={handleSubmit} >
            <div className='grid gap-6 mb-6'>
              <label htmlFor='location' className='block text-sm font-medium text-gray-900 dark:text-gray-300'></label>
              <input 
              type="text" 
              id={city} 
              onChange={event => setCity(event.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-xl" 
              placeholder="Search city" 
              required></input>
            </div>
          </form>
          <div className='text-3xl'>{location.name}, {location.country}</div>
          <div className='text-4xl pb-3'>{degrees.temp_c}°C</div>
          <div className='text-2xl pb-2'>{condition.text}</div>
          <img className="scale-95"src={condition.icon} alt="weather_icon"></img>
          {isErrorVisible && <div>Please enter a valid city</div>}
        </div>
      );
    }
export default Data;