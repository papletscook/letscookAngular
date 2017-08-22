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
        private validLoginService: ValidLoginService) { }

    ngOnInit(): void {
        this.validLoginService.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./letscook/entrar']);
            }
        });
    }

    sair(): void {
        sessionStorage.clear();
        this.router.navigate(['./letscook/entrar']);
    }
    //Criar component.....
    createNuleComponent() {
        this.componentData = {
            component: null,
            inputs: {
                nothing: null
            }
        }
    }
}