import axios from "axios";

const URL = "https://wallet-cloudflare.gordongecco.workers.dev/";
// const URL = "http://127.0.0.1:8787/";


export const apiCall = (METHOD,endPoint,data,token)=>{
  const params =  data ? data : null; 
  const header = token ? {
    Authorization: "Bearer " + token,
  } : null;
  
  return axios({
    method: METHOD,
    url: URL + endPoint,
    data: params,
    headers: header
  });
}
