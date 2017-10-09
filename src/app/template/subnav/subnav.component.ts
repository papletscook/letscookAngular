import { TemplateService } from 'app/service/template.service';
import { TemplateComponent } from 'app/template/template.component';
import { Component, OnInit, Input } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import { MenuSubnav } from 'app/viewmodel/template/menu-subnav/menu-subnav';

@Component({
    selector: 'subnav',
    templateUrl: 'subnav.component.html',
    styleUrls: ['subnav.component.css'],
    providers: [TemplateComponent, TemplateService]
})

export class SubnavComponent implements OnInit {

    @Input() menu: MenuSubnav;


    ngOnInit() { }



}