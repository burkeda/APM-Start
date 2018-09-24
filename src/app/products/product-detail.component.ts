import { Component, OnInit } from '@angular/core';

import { IProduct } from './product'

@Component({
  // The selector is only required if the Component will be nested in another component.
  // This comp won't be nested, rather it will be displayed as part of the routing, so we can remove it
  // selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  pageTitle: string = 'Product detail';
  product: IProduct;

  constructor() { }

  ngOnInit() {
  }

}
