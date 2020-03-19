import {API} from '@/constants.js' ;
// import config from '@/api/config.js' ;
import axios from 'axios' ;

export function register(data){
  let url = `${API}/register` ;
  return axios.post(url,data) ;
}

export function login(data){
  let url = `${API}/login` ;
  return axios.post(url,data) ;
}

export function get_csrf(){
  let url = `${API}/airlock/csrf-cookie` ;
  return axios.get(url).then(response => {
    console.log(response)
  })
}
