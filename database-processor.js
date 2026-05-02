import { kafkaClient } from "./kafka-client.js";

async function init(){

    const PORT=process.env.PORT || 1905;

const kafkaConsumer=kafkaClient.consumer({groupId:`socket-server ${PORT}`});
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({topic:'location-updates', fromBeginning:true});

    kafkaConsumer.run({
        eachMessage:async ({topic,partition,message,heartbeat})=>{
     const data=JSON.parse(message.value.toString());
   //  const socketId=data.id;
    // const lat=data.lat;
    // const lng=data.lng;

  console.log(`Insert into db location `,data);
    
   await heartbeat();
},
});
 

}

init()