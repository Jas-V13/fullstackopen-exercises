import axios from 'axios'

const bUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getData = (lat,lon, apik) => {
    return axios.get(`${bUrl}lat=${lat}&lon=${lon}&appid=${apik}`)
}

export default {getData}