import { Component, OnInit, Input } from '@angular/core';
import { UserFull } from 'app/viewmodel/template/login/userFull';

@Component({
    selector: 'perfil-component',
    templateUrl: 'perfil.component.html',
    styleUrls: ['perfil.component.css']
})

export class PerfilComponent implements OnInit {

    @Input() public userFull: UserFull;

    constructor() { }

    public ngOnInit() {
        console.log(this.userFull);
    }
}