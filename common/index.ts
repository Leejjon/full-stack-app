import {IsString} from "class-validator";

export class ResponseBody {
    @IsString()
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}

export class RequestBody {
    @IsString()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
