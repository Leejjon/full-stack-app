import {IsString, Length} from "class-validator";

export class ResponseBody {
    @Length(1, 100)
    @IsString()
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}

export class RequestBody {
    @Length(1, 30)
    @IsString()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
