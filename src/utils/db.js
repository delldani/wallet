import axios from 'axios';

const URL = 'https://wallet-cloudflare.gordongecco.workers.dev/';

const dbRegistration = (username,password)=>{
    return axios
    .post(URL + "reg",
      {
        name: username,
        password: password,
      },
    )
    };
    
    const dbLogin = (username,password)=>{
      return axios
      .post(URL + "login",
        {
          name: username,
          password: password,
        },
      )
      };
    
      export  const handleRegistration = (values,setLoginData,navigate)=>{
        const {radioGroup,username,password1} = values;
      const userName = radioGroup === 'teacher' ? 't' + username : 'p' + username ;
      dbRegistration(userName,password1).then((response)=>{
    
              //ha sikerült a regisztráció akkor beloginol
              dbLogin(userName,password1).then(response=>{
                setLoginData(response.data);
                radioGroup === 'teacher' ?  navigate("/list") : navigate("/wallet");
              }).catch(error=>console.log(error));
    
        })
        .catch(function (error) {
          console.log(error);
        })
      };


      export const handleLogin =(values,setLoginData,navigate)=>{
        const {username,password} = values;

                dbLogin(username,password).then(response=>{
                    setLoginData(response.data);
                    response.data.username[0] === 't' ?  navigate("/list") : navigate("/wallet");
                }).catch(error=>console.log(error));
            }


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
    