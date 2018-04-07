
import { Socket } from 'phoenix';

let socket = new Socket('ws://localhost:4000/socket', {});
socket.connect();
let channel = socket.channel('room:lobby', {});
channel
  .join()
  .receive('ok', resp => {
    console.log('Joined successfully', resp);
  })
  .receive('error', resp => {
    console.log('Unable to join', resp);
  });

channel.push('msg', { msg: 'go out' });