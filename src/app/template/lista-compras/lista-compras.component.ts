import { HolderService } from './../../service/holder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  private loading: boolean = true;

  constructor(private holder: HolderService) { }

  ngOnInit() {
    this.loading = false
  }

}
