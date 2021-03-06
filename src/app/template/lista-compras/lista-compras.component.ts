import { IngredienteDespensa } from 'app/viewmodel/template/despensa/ingrediente-despensa';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { DespensaService } from './../despensa/despensa.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { CompleterService } from 'ng2-completer';
import { IngredienteService } from './../ingrediente/ingrediente.service';
import { ItemLista } from './../../viewmodel/template/lista/item-lista';
import { AlertService } from './../../service/alert.service';
import { ListaCompra } from 'app/viewmodel/template/lista/lista-compra';
import { HolderService } from './../../service/holder.service';
import { Component, OnInit } from '@angular/core';
import { ListaComprasService } from 'app/template/lista-compras/lista-compras.service';
import { Despensa } from 'app/viewmodel/template/despensa/despensa';

@Component({
    selector: 'app-lista-compras',
    templateUrl: './lista-compras.component.html',
    styleUrls: ['./lista-compras.component.css'],
    providers: [ListaComprasService, IngredienteService, DespensaService, AlertService]

})
export class ListaComprasComponent implements OnInit {

    private loading: boolean = true;

    private listas: ListaCompra[];

    private editedLista: ListaCompra;
    private itemListaH: ItemLista;
    private createdLista = new ListaCompra();

    private modalModifica: boolean = false;

    private modalCreate: boolean = false;

    private listaDeIngredientes: Ingrediente[];
    protected searchStr: string;
    protected dataService: any;

    private btnDisabledCreateLista: boolean = false;
    private btnNameCreateLista: string = "Criar Lista";

    constructor(private holder: HolderService,
        private listaComprasService: ListaComprasService,
        public alertService: AlertService,
        public ingredienteService: IngredienteService,
        private despensaService: DespensaService,
        private completerService: CompleterService,
        private alert: AlertService,
        private router: Router) { }

    public ngOnInit() {
        if (!this.holder.userLogado) {
            this.router.navigate(['/']);
        }
        this.loading = false
        this.carregar();
        this.listarIngredientes();
    }

    public cadastrar() {
        this.btnDisabledCreateLista = true;
        this.btnNameCreateLista = "Aguarde";
        this.listaComprasService
            .cadastrarListaDeCompra(this.createdLista)
            .then(data => {
                this.modalCreate = false;
                setTimeout(() => {
                    this.carregar();
                }, 1);
                this.btnDisabledCreateLista = false;
                this.btnNameCreateLista = "Criar Lista";
            }, error => {
                this.btnDisabledCreateLista = false;
                this.btnNameCreateLista = "Criar Lista";
                this.alertService.error(error.message);
            })
    }

    public carregar() {
        this.listaComprasService
            .buscarPorUsuario().then(data => {
                this.listas = data;
            }, error => {
                this.alertService.error(error.message);
            });
        this.loading = false;
    }

    public editarLista(r: ListaCompra) {
        this.editedLista = r;
        this.modalModifica = true;
    }

    public createLista() {
        this.modalCreate = true;
    }

    public integrarNaDespensa() {
        this.despensaService.buscarPorUsuario()
            .then(data => {
                let despensa: Despensa = data;
                let ingreDespensa: Ingrediente[] = []

                for (let ingDes of despensa.ings) {
                    ingreDespensa.push(ingDes.ingrediente)

                }
                for (let item of this.editedLista.itens) {
                    if (item.checked) {
                        if (!this.contains(item.ingrediente, ingreDespensa)) {
                            despensa.ings.push({ ingrediente: item.ingrediente });
                        }
                    }
                }

                this.despensaService.atualizarDespensa(despensa);
                this.alert.info("Ingredientes integrados a Despensa!")
            }, error => {
                this.alert.error("Falha ao Sacar Ingredientes da Despensa!")
            });
    }

    public contains(cat: Ingrediente, lst: Ingrediente[]): boolean {
        for (let element of lst) {
            if (cat.nome === element.nome) {
                return true;
            }
        }
        return false;
    }

    public excluirLista(r: ListaCompra) {
        this.listaComprasService.deletarListaDeCompras(r);
        let index = this.listas.indexOf(r);
        if (index !== -1) {
            this.listas.splice(index, 1);
        }
    }

    private adicionarIngrediente() {
        let itemLista: ItemLista;
        itemLista = {
            id: null,
            nome: "Nome do item",
            checked: false,
            ingrediente: null
        };
        this.editedLista.itens.push(itemLista);
    }

    private listarIngredientes() {
        this.ingredienteService
            .list()
            .then(data => {
                this.listaDeIngredientes = data;
                this.dataService = this.completerService.local(data, 'nome', 'nome');
            }, error => {
                this.alertService.error(error.message);
            });
    }

    private atualizaListaDeCompras() {
        this.listaComprasService
            .atualizarListaDeCompra(this.editedLista)
            .then(data => {
                this.integrarNaDespensa()
            }, error => {
                this.alertService.error(error.message);
            })
    }

    private excluirIngredienteDaLista(ingrediente: ItemLista) {
        let index = this.editedLista.itens.indexOf(ingrediente);
        if (index !== -1) {
            this.editedLista.itens.splice(index, 1);
        }
        this.atualizaListaDeCompras();
    }

    private adicionaIngredienteNacreatedLista() {
        let itemLista: ItemLista;
        itemLista = {
            id: null,
            nome: "Nome do item",
            checked: false,
            ingrediente: null
        };
        if (typeof this.createdLista.itens != "undefined") {
            this.createdLista.itens.push(itemLista);
        } else {
            this.createdLista.itens = [itemLista];
        }
    }

    private excluirIngredienteDaListaCreate(ingrediente: ItemLista) {
        let index = this.createdLista.itens.indexOf(ingrediente);
        if (index !== -1) {
            this.createdLista.itens.splice(index, 1);
        }
    }

    private atualizaModificaLista() {
        this.modalModifica = false;
        this.atualizaListaDeCompras();
    }

    private editaPassoH(item: ItemLista) {
        this.itemListaH = item;
    }
    private outPassoH() {
        this.itemListaH = null;
    }

    private validaSeJaPossuiItensDaLista() {

    }

}
