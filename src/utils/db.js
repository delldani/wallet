import axios from 'axios';

const URL = 'https://wallet-cloudflare.gordongecco.workers.dev/';

export const dbRegistration = (username,password)=>{
    return axios
    .post(URL + "reg",
      {
        name: username,
        password: password,
      },
    )
    };
    
    export const dbLogin = (username,password)=>{
      return axios
      .post(URL + "login",
        {
          name: username,
          password: password,
        },
      )
      };
    
    // axios
    // .post(
    //   "https://wallet-cloudflare.gordongecco.workers.dev/user/search",
    //   {
    //     name: "dani2",
    //     // password: "dani2",
    //   },
    //   {
    //     headers: {
    //       Authorization:
    //         "Bearer " +
    //         "NzEwOTYwMjQ3MTc5MTA5_MTY4MDQ1NDgyNTA4OTAyMTc_1857815512510722617816717181253223200173197721671581620078146639175421261382435245",
    //     },
    //   }
    // )
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    