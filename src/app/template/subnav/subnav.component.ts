import { TemplateComponent } from 'app/template/template.component';
import { Component, OnInit, Input } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import { MenuSubnav } from 'app/viewmodel/template/menu-subnav/menu-subnav';

@Component({
    selector: 'subnav',
    templateUrl: 'subnav.component.html',
    styleUrls: ['subnav.component.css'],
    providers: [TemplateComponent]
})

export class SubnavComponent implements OnInit {

    @Input() menus: MenuSubnav[];

    constructor(
        private holderService: HolderService,
        private template: TemplateComponent) { }

    ngOnInit() { }

    private abreComponent(menu) {
        this.template.changeCase(menu)
    }


}