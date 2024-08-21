import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyFormat } from '../../../util/currencyFormat';

@Component({
  selector: 'app-showRendicion',
  templateUrl: './showRendicion.component.html',
  styleUrls: ['./showRendicion.component.css'],
  standalone : true,
  imports : [CommonModule, CurrencyFormat]
})
export class ShowRendicionComponent implements OnInit {
  data: any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.data = history.state.data;
    if (this.data) {
      console.log(this.data);
    } else {
      console.log('No hay datos disponibles en el estado del router.');
    }
  }

}
