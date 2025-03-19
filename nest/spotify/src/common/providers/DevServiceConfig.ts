import { Injectable } from "@nestjs/common";



@Injectable()
export class DevServiceConfig {
    DBHOST = 'localhost';
    getDBHOST(): string {
        return this.DBHOST;
    }
}