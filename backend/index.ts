import express, {NextFunction, Request, RequestHandler, Response} from "express";
import cors from "cors";
import {plainToClass} from "class-transformer";
import {RequestBody, ResponseBody} from "common";
import {validate} from "class-validator";

const path = require('path');
const app = express();

// Enable cors to be able to reach the backend on localhost:8080 while running React.js in dev mode on localhost:3000
// You might want to disbale this on production.
app.use(cors());
app.use(express.json() as RequestHandler);

app.post('/api', async function(req: Request, res: Response) {
    let body = plainToClass(RequestBody, req.body as Object);
    let validationErrors = await validate(body);
    if (validationErrors.length == 0) {
        const responseBody: ResponseBody = new ResponseBody("Hello, " + body.name);
        res.contentType('application/json');
        res.status(200);
        res.send(responseBody);
    } else {
        res.sendStatus(400);
    }
});

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req: Request, res: Response, next: NextFunction) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

app.use(express.static(path.join(__dirname, 'build')));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
