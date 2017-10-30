import { element } from 'protractor';
import { ItemLista } from './../../../viewmodel/template/lista/item-lista';
import { ListaCompra } from 'app/viewmodel/template/lista/lista-compra';
import { ListaComprasService } from './../../lista-compras/lista-compras.service';
import { TitleCasePipe } from './../../../pipe/title-case.pipe';
import { AlertService } from 'app/service/alert.service';
import { MedidaService } from './../medida.service';
import { ReceitaService } from './../receita.service';
import { PublicarReceitaComponent } from 'app/template/menu-receita/publicar-receita/publicar-receita.component';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Usuario } from './../../../viewmodel/template/login/usuario';
import { SessionService } from './../../../service/session.service';
import { PrepararReceitaComponent } from 'app/template/menu-receita/preparar-receita/preparar-receita.component';
import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import { MockReceita } from 'app/template/menu-receita/mock/mockReceita';
import { ToastsManager } from 'ng2-toastr';
import { Medida } from 'app/viewmodel/template/receita/medida';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'ver-receita-component',
    templateUrl: 'ver-receita.component.html',
    styleUrls: ['ver-receita.component.css'],
    providers: [
        ReceitaService,
        MedidaService,
        ListaComprasService
    ]
})


export class VerReceitaComponent implements OnInit {

    receitaInativa: boolean = false;

    excluir: boolean;

    avgRatingReceita: number;

    preparar: boolean = false;

    medidas: any = null;

    @Input()
    private receita: Receita;

    private editedReceita: Receita;

    private loading: boolean = true;

    @ViewChild(PrepararReceitaComponent)
    private prepararComp: PrepararReceitaComponent;

    @ViewChild(PublicarReceitaComponent)
    private editarComp: PublicarReceitaComponent;

    private blocked: boolean = false;


    constructor(private receitaService: ReceitaService,
        private session: SessionService,
        private medidaService: MedidaService,
        private alertService: AlertService,
        private holder: HolderService,
        private route: ActivatedRoute,
        private listaComprasService: ListaComprasService) {
    }


    ngOnInit() {
        this.receita = new Receita()
        this.receita.id = Number(this.route.snapshot.paramMap.get('id'));

        this.medidaService.list()
            .then(data => {
                this.medidas = data;
            }, error => {
            });

        this.receitaService.getById(this.receita).then(data => {
            this.receita = data;
            this.loading = false;
            this.ratingReceita();
            this.receitaAtiva();
            this.blocked = !this.isLogged();
        }, error => {
            this.alertService.error('Ocorreu um erro ao obter receita!');
        });


    }


    private receitaAtiva() {
        if (this.receita.status != 'POSTADA') {
            this.receitaInativa = true;
        }
    }


    private prepararReceita() {
        this.prepararComp.open = true;
    }

    private ratingReceita() {
        let avas = this.receita.avaliacoes;
        if (!avas) {
            return;
        }
        let sum = 0;
        for (let ava of avas) {
            sum += ava.valor;
        }
        this.avgRatingReceita = sum / avas.length;
    }



    private detailMedida(medida: string): Medida {
        for (let med of this.medidas) {
            if (med.name == medida) {
                return med;
            }
        }
        return null;
    }

    isLogged(): boolean {
        return this.session.consultarUsuario() != null;
    }

    isDonoReceita(): boolean {
        try {
            return this.receita.criador.email == this.session.consultarUsuario().email
        } catch (error) {
            return false;
        }
    }

    editarReceita() {
        let r = this.receita;
        this.editarComp.carregarCampos();
        this.editedReceita = r;
        this.editarComp._open = true;
    }

    excluirReceita() {
        this.receita.status = 'DESATIVADA';
        this.receitaService.atualizar(this.receita).then(data => {
            location.reload();
        }, error => {
            this.alertService.error('Ocorreu um erro ao excluir receita!');
        });
        this.excluir = false;
    }

    public adicionarIngredientesAListaDeCompras() {
        let listaCompra: ListaCompra;
        listaCompra = {
            id: null,
            nome: "Ingredientes para: " + this.receita.nome,
            itens: []
        }
        this.receita.ingts.forEach(element => {
            listaCompra.itens.push({ id: null, nome: element.quant + " " + this.detailMedida(element.uMedida).desc + " de " + element.ingrediente.nome });
        });
        this.listaComprasService
            .cadastrarListaDeCompra(listaCompra)
            .then(data => {
                this.alertService.info("Lista de compras gerada com sucesso.");
            }, error => {
                this.alertService.error(error.message);
            });
    }

}
