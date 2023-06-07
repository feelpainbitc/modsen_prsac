const defaultValueCenter={
    lat:54.30920403493205,
    lng: 26.87096111598955
  };

export const getBrowserLocation=()=>{
    return new Promise((resolve,reject)=>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(
                (pos)=>{
                    const { latitude:lat, longitude:lng}=pos.coords;
                    resolve({lat,lng});
                },
                ()=>{
                    reject(defaultValueCenter);
                },
            );
        }else{
            reject(defaultValueCenter);
        }
    });
};