import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {IsString, validate} from "class-validator";
import {plainToClass} from "class-transformer";

class ResponseBody {
    @IsString()
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}

class RequestBody {
    @IsString()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

function App() {
    const responseBody: ResponseBody = { message: "No response yet"};
    const [yourName, setYourName] = useState("Your name");
    const [response, setResponse] = useState<ResponseBody>(responseBody);

    async function handleJsonFromApi(json: any) {
        let body = plainToClass(ResponseBody, json as Object);
        let validationErrors = await validate(body);
        if (validationErrors.length > 0) {
            setResponse({message: `The server retrieved an object with ${validationErrors.length} validation errors.`})
        } else {
            setResponse(body);
        }
    }

    function fetchApi() {
        const requestBody: RequestBody = {
            name: yourName
        };

        fetch('http://localhost:8080/api/', {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(requestBody)
        })
            .then((response) => response.json())
            .then(handleJsonFromApi)
            .catch(() => { setResponse({ message: "Failed fetching from the API"}) })
    }

    return (
        <div className="App">
            <label>Name</label><br/>
            <input id="name" type="text" value={yourName} onChange={(changeEvent: ChangeEvent<HTMLInputElement>) => {setYourName(changeEvent.target.value)}}/>
            <br/><br/>
            <button onClick={() => fetchApi()}>Call API</button>
            <br/><br/>
            <textarea readOnly={true} style={{height: "200px"}} value={response.message}></textarea>
        </div>
    );
}

export default App;
