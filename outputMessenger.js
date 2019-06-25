
const axios =require( "axios");

// api 
// application:mdc
// key: UQ4HX65AHR6W8VM68Y86228XX3D784SB

var payload={
  from:"11849410",
  to:"admin",
  message:"hi"
}
//authentication

// GET /api/users  
// Accept: application/json, text/javascript, */*;  
// API-KEY: UQ4HX65AHR6W8VM68Y86228XX3D784SB 
// Host: 172.16.16.137:14125
// console.log("hiiiiiii")

// callApi(payload)
  // callApi = async ( payload) => {
console.log("hiiiiiii: ",payload)
    
    // const response = await axios({
       await axios({
      method: "post",
      url: "/api/notify?from="+payload.from+"&to="+payload.to+"&message="+payload.message+"&color=C7EDFC&otr=0&notify=1",
      // headers: { "x-access-token": localStorage.getItem("token") },
      // data: payload
    });
    if (response.status !== 200) throw Error(response.message);
    console.log("response: ",response) ;
    // return response;
  // };




