export class Alert {
    error?: boolean = true;
    detail: string;

    constructor(detail: string) {
        this.detail = detail;
    }

}