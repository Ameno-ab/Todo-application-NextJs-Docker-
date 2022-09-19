import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
    
   
  }, []);
  useEffect(() => {
    
    getUser();
   
  }, [state]);
  const router = useRouter();

  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

     const getUser = () =>{
      // var User= JSON.parse(window.localStorage.getItem("auth"))

      if(!state){
        // setState(User);
        // router.push("/index")
      // }else{
        setState(null);
        router.push("/login")
      }
     }


  // axios.interceptors.response.use(
  //   function (response) {
  //     // Do something before request is sent
  //     console.log("response")
  //     return response;
  //   },
  //   function (error) {
  //     // Do something with request error
  //     let res = error.response;
  //     if (res.status === 401 && res.config && !res.config._isRetryRequest) {
  //       setState(null);
  //       window.localStorage.removeItem("auth");
  //       console.log("login not found");
  //       router.push("/login");
  //     }
  //   }
  // );
  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
      {console.log("token",token)}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
