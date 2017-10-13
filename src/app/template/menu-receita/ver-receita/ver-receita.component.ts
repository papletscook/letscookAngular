import { PrepararReceitaComponent } from 'app/template/menu-receita/preparar-receita/preparar-receita.component';
import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { IngredienteService } from 'app/service/ingrediente.service';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { CategoriaService } from 'app/service/categoria.service';
import { MedidaService } from 'app/service/medida.service';
import { ReceitaService } from 'app/service/receita.service';
import { HolderService } from 'app/service/holder.service';
import { MockReceita } from 'app/template/menu-receita/mock/mockReceita';
import { Receita } from 'app/viewmodel/template/receita/receita';
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

    private loading: boolean = true;

    @ViewChild(PrepararReceitaComponent)
    private prepararComp: PrepararReceitaComponent;


    constructor(private receitaService: ReceitaService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private medidaService: MedidaService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.receita = new Receita();
        this.receita.id = 28
        
        this.medidaService.list()
            .then(data => {
                this.medidas = data;
            }, error => {
            });

        this.receitaService.getById(this.receita).then(data => {
            this.receita = data;
            this.loading = false;
        }, error => {
            this.toastr.error('Ocorreu um erro ao obter receita!', 'Oops!');
        });
    }


    private prepararReceita() {
        this.preparar = true
    }

    private detailMedida(medida: string): Medida {
        for (let med of this.medidas) {
            if (med.name == medida) {
                return med;
            }
        }
        return null;
    }



}
