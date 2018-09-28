import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';

@Component({
  // The selector is only required if the Component will be nested in another component.
  // This comp won't be nested, rather it will be displayed as part of the routing, so we can remove it
  // selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit { // , OnDestroy

  // tslint:disable-next-line:no-inferrable-types
  pageTitle: string = 'Product detail';
  product: IProduct;

  /*OnDestroy
    We want an instance of the ActivatedRoute service so we define it as a
    dependency and it provides an instance via the dependency injector service.

    We use the instance of the activated route service to get the desired
    parameter.

    Import the router service to activate a link with code

    We add another constructor parameter to inject the router service instance
    using a 2nd param!

    We define a dependency on the Router service using a constructor parameter.
    The router instance is injected in this component class

    Anytime you inject a service instance into a class, make sure you registered
    this service with the Angular injector

  */
  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  // ngOnDestroy() {
  //   console.log('ProductDetailComponent: ngOnDestroy');
  // }

  ngOnInit() {
    // tslint:disable:quotemark
    // tslint:disable-next-line:prefer-const
    let id = + this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.product = {
      "productId": id,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2016",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    };
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
