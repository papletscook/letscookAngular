import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

    public msg: string;

    public clrAlertType: string = 'alert-danger';

    constructor() { }

    public error(str: string): void {
        this.msg = str;
        this.clrAlertType = 'alert-danger';
        this.doAction();
    }

    public info(str: string): void {
        this.msg = str;
        this.clrAlertType = 'alert-info';
        this.doAction();
    }

    public doAction() {
        setTimeout(function () {
            this.msg = null;
        }, 5000);
    }

}