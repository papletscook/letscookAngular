import { HolderService } from './../util/holder/holder.service';
import { ValidLoginService } from './../util/login/valid-login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'template-full',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css']
})

export class TemplateComponent implements OnInit {

    private componentData = null;
    public receita: string;

    constructor(private router: Router,
        public validLoginService: ValidLoginService,
        public holderService: HolderService) { }

    ngOnInit(): void {
        //Colocar esta função para bloquear as paginas...
        // this.validLoginService.isLogado().then((result: boolean) => {
        //     if (!result) {
        //         this.holderService.modalOpen = true;
        //     } else {
        //         this.holderService.userLogado = true;
        //     }
        // });
    }

    public entrar() {
        this.holderService.modalOpen = true;
    }

    public sair() {
        sessionStorage.clear();
        this.holderService.userLogado = false;
        //this.router.navigate(['./letscook/']);
    }

    //Criar component.....
    public createNuleComponent() {
        this.componentData = {
            component: null,
            inputs: {
                nothing: null
            }
        }
    }

}