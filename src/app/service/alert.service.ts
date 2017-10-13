import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

    public msg: string;

    public clrAlertType: string = 'alert-danger';

    constructor() { }

    public error(str: string): void {
        this.msg = str;
        this.doAction();
    }

    public doAction() {
        setTimeout(function () {
            this.msg = null;
        }, 5000);
    }

}