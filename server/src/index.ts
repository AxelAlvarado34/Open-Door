import server from "./server";
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 4000;

server.listen(port, ()=> {
    console.log(colors.magenta(`Server starter on port: ${port}`));
})