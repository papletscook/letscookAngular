import { TemplateService } from './../template.service';
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

    constructor(
        public holderService: HolderService) { }

    public ngOnInit() { }

    public veQualMenuEstaAtivo(): Boolean {
        let valid: boolean = false;
        if (this.holderService.qualMenuEstaAtivo === this.menu.component) {
            valid = true;
        }
        return valid;
    }

}