import { useState } from "react";

const HomePage=()=>{
const [latitude,setLatitude]=useState();
const [longitude,setLongitude]=useState();

    const findLocation=()=>{
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            const crd = pos.coords;
          
            setLatitude(crd.latitude);
            setLongitude(crd.longitude);
           

          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
    }

    return <div>
        <p className="font-bold">Welcome to home page</p>
        <button onClick={findLocation}>Nearby places</button> 
       <p>Longitude: {longitude}</p> 
       <p>Latitude: {latitude}</p> 
    </div> 
}


export default HomePage;


