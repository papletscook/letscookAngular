import { MenuSidenav } from './../../viewmodel/menu-sidenav/menu-sidenav';
import { SidenavService } from './sidenav.service';
import { Component, OnInit, Input } from '@angular/core';

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