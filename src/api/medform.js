import {API_ENDPOINT} from '@/constants.js' ;
import config from '@/api/config.js' ;
import axios from 'axios' ;

export function addFromMedGroup(data){
  let url = API_ENDPOINT+'/medgroup' ;
  // probable use jsonschema to validate first
  return axios.post(url, data, {headers:{Authorization:'Bearer '+ config.auth_token}}) ;
}

export function addMed(data){
  let url = API_ENDPOINT+'/meds' ;
  // probable use jsonschema to validate first
  return axios.post(url, data, {headers:{Authorization:'Bearer '+ config.auth_token}}) ;
}

// not all key may be present
export function updateMed(data){
  let url = API_ENDPOINT+'/meds' ;
  // probable use jsonschema to validate first
  return axios.put(url, data, {headers:{Authorization:'Bearer '+ config.auth_token}}) ;
}
