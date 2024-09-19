import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieSession from 'cookie-session';
import router  from './chat/index.js';
import initWebsocket from './chat/websocket.js';

const logoutWebsocket = initWebsocket();
const app = express();

app.use(
  cookieSession({
    name:'session',
    keys: ['key1','key2'],
  }),
);

app.use(express.urlencoded({extended:false}));

app.set('views', `${dirname(fileURLToPath(import.meta.url))}/chat/views`);
app.set('view engine','ejs');

app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

app.get('/',(request,response) => {
  response.render('login');
})

app.use(router(logoutWebsocket));

app.listen(8080, () =>{
  console.log('Multichat started on port 8080...');
});
