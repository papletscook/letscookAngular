import { ComponentInfo } from './../../viewmodel/template/componentInfo';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'index-page-component',
    templateUrl: 'index-page.component.html',
    styleUrls: ['index-page.component.css']
})

export class IndexPageComponent implements OnInit, ComponentInfo {
    nome: string = "Página Inicial"
    component: any = this;

    constructor() { }

    ngOnInit() {

    }
}