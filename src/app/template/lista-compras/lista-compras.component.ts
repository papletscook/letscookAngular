import { ListaCompra } from 'app/viewmodel/template/lista/lista-compra';
import { HolderService } from './../../service/holder.service';
import { Component, OnInit } from '@angular/core';
import { ListaComprasService } from 'app/template/lista-compras/lista-compras.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css'],
  providers: [ListaComprasService]

})
export class ListaComprasComponent implements OnInit {

  private loading: boolean = true;

  private listas: ListaCompra[];

  private editedLista: ListaCompra;

  constructor(private holder: HolderService,
    private serv: ListaComprasService) { }

  ngOnInit() {
    this.loading = false
    this.carregar()
  }

  public carregar() {
    this.serv.buscarPorUsuario().then(data => {
      this.listas = data;
    }, error => {
    });
    this.loading = false;

  }

  public editar(r: ListaCompra) {
    this.editedLista = r;
  }

  public excluir(r: ListaCompra) {
  }

}
