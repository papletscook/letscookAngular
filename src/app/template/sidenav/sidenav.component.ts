import { SidenavService } from './sidenav.service';
import { Component, OnInit, Input } from '@angular/core';
import { MenuSidenav } from 'app/viewmodel/template/menu-sidenav/menu-sidenav';

@Component({
    selector: 'sidenav-component',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css'],
    providers: [SidenavService]
})

export class SidenavComponent implements OnInit {

    @Input() menus: MenuSidenav[];

    constructor() { }

    ngOnInit() { }
}