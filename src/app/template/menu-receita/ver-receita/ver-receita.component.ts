import { PublicarReceitaComponent } from 'app/template/menu-receita/publicar-receita/publicar-receita.component';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Usuario } from './../../../viewmodel/template/login/usuario';
import { SessionService } from './../../../service/session.service';
import { PrepararReceitaComponent } from 'app/template/menu-receita/preparar-receita/preparar-receita.component';
import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { CategoriaService } from 'app/service/categoria.service';
import { MedidaService } from 'app/service/medida.service';
import { ReceitaService } from 'app/service/receita.service';
import { HolderService } from 'app/service/holder.service';
import { MockReceita } from 'app/template/menu-receita/mock/mockReceita';
import { ToastsManager } from 'ng2-toastr';
import { Medida } from 'app/viewmodel/template/receita/medida';



@Component({
    selector: 'ver-receita-component',
    templateUrl: 'ver-receita.component.html',
    styleUrls: ['ver-receita.component.css'],
    providers: [
        ReceitaService,
        MedidaService]
})


export class VerReceitaComponent implements OnInit {
    preparar: boolean;

    medidas: any = null;

    @Input()
    private receita: Receita;

    private editedReceita: Receita;

    private loading: boolean = true;

    @ViewChild(PrepararReceitaComponent)
    private prepararComp: PrepararReceitaComponent;

    @ViewChild(PublicarReceitaComponent)
    private editarComp: PublicarReceitaComponent;


    constructor(private receitaService: ReceitaService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private session: SessionService,
        private medidaService: MedidaService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        if (!this.receita) {
            this.receita = new Receita();
            this.receita.id = 28
        }


        this.medidaService.list()
            .then(data => {
                this.medidas = data;
            }, error => {
            });

        this.receitaService.getById(this.receita).then(data => {
            this.receita = data;
            this.loading = false;
            console.log(this.isDonoReceita())
        }, error => {
            this.toastr.error('Ocorreu um erro ao obter receita!', 'Oops!');
        });


    }


    private prepararReceita() {
        this.prepararComp.open = true;
    }

    private detailMedida(medida: string): Medida {
        for (let med of this.medidas) {
            if (med.name == medida) {
                return med;
            }
        }
        return null;
    }

    isDonoReceita(): boolean {
        return this.receita.criador.email == this.session.consultarUsuario().email
    }

    editarReceita() {
        let r = this.receita;
        this.editedReceita = r;
        this.editarComp._open = true;
    }


}
