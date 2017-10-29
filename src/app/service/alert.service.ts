import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

    public msg: string;

    public clrAlertType: string = 'alert-danger';

    constructor() { }

    public error(str: string): void {
        this.clrAlertType = 'alert-danger';
        this.msg = str;
    }

    public info(str: string): void {
        this.clrAlertType = 'alert-info';
        this.msg = str;
    }


}