import Server from "./clases/server";
import router from "./routes/router";
import bodyParser = require("body-parser");
import cors = require("cors");

const server = Server.instance;

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

server.app.use(cors({origin: true, credentials: true}))

server.app.use('/', router);

server.start(()=>{
    console.log(`Servidor corriendo bien en localhost:${server.port}`);
});
