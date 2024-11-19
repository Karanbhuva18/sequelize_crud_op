import { DB_Connection } from './src/database/index.js';
import app from './app.js';
DB_Connection().then(() =>{
    app.listen((process.env.PORT || 5000),() =>{
        console.log(`server started on port ${process.env.PORT || 5000}`)
    });
    console.log('DB Connected');
}).catch((error) =>{
    console.log(error);
})