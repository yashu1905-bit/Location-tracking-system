import http from 'http';

import express from 'express';
import { Server } from 'socket.io';
import path from 'path';

import {kafkaClient} from './kafka-client.js';

async function main(){
    const PORT=process.env.PORT || 1905;

    const app=express();
    const server=http.createServer(app);
    const io=new Server();

    const kafkaProducer=kafkaClient.producer();
    await kafkaProducer.connect();

    const kafkaConsumer=kafkaClient.consumer({groupId:`socket-server ${PORT}`});
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({topic:'location-updates', fromBeginning:true});

    kafkaConsumer.run({
        eachMessage:async ({topic,partition,message,heartbeat})=>{
     const data=JSON.parse(message.value.toString());
   //  const socketId=data.id;
    // const lat=data.lat;
    // const lng=data.lng;

  console.log(`Kafka consumeer data recieved :${data}`);
    io.emit('server:location:update', {
        id: data.id,
        latitude: data.lat,
        longitude: data.lng,
      });
   await heartbeat();
},
});

    io.attach(server);

    io.on('connection', (socket) => {
        console.log(`Socket: ${socket.id} connected successfully`);

        socket.on('client location update', async (locationData) => {
            const{lat,lng}=locationData;
            console.log(`Socket: ${socket.id} location update: lat=${lat}, lng=${lng}`);

          await  kafkaProducer.send({topic:'location-updates', messages:[{
             key:socket.id,
                value:JSON.stringify({id:socket.id,lat,lng})
            }]})
        });
    });

    app.use(express.static(path.resolve('./public')));
    

    app.get('/',(req,res)=>{
        return  res.send('Hello World!');
    });

    server.listen(PORT,()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

main()
