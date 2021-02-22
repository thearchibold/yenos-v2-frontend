//@ts-check

export default async (name) => {
   const res = await fetch(`https://yenos.herokuapp.com/api/v2/gender?name=${name}`, {
       headers:{
           "Control-Allow-Origin":"*",
           "Access-Control-Allow-Origin":"*"
       }
   })
   const jsonResponseData = await res.json()

   return jsonResponseData

}