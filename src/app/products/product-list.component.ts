// tslint:disable:no-inferrable-types
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})



export class ProductListComponent implements OnInit {

  pageTitle: string = 'Awesome CD list';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  // listFilter: string = 'cart';      // a way to know when the user changes the list filter text
  errorMessage: string;

  private _listFilter: string;
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];    // array for holding our filteredProducts list
  products: IProduct[] = [];       // any[] = [];

  // when instance of ProductList Component is created,
  //  the Angular injector injects the instance of the ProductService
  /*
      We specify dep as params to the contstructor functiopn
      Assign injected service instance to local variable, this._productService
      Angular created a shorcut to this all this code:
      We use the private keyowrd to the constructor param, and shortcut to define varaible and assign to the parameter

  */
  constructor(private productService: ProductService) { // Dependency Injection
    // this.listFilter = 'cart';
  }

  onRatingClicked(message: string): void {
    console.log(`In component class ProductList, onRatingClicked payload: ${message}`);
    this.pageTitle = 'CD List ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    try {

    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      // tslint:disable-next-line:no-non-null-assertion
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);

    } catch (e) {
      throw new Error(e.Message);
    }
  }

  toggleImage(): void {
    // interesting way to declare private member functions
    // this.showImage = this.newMethod();
    this.showImage = !this.showImage;
  }

  // private newMethod(): boolean {
  //   return !this.showImage;
  // }

  // Lifecycle hook, a place to perform any initialization and
  //  retrieve data from service
  // We want to set the products property to the products returned from our service
  //  to call the service we use our private variable containing the instance of the injected service
  ngOnInit(): void {
    console.log('In component class ProductList, In OnInit');
    // this.products = this.productService.getProducts();

    // To call the service we use our private variable - this.productService - to call the servier instance
    // Now that our product service is returning an observable,
    //  any class that needs product data such as our product list
    //  component  can call our service and subscribe to the returned
    //  observable
    // Since Observable does not return until subscribed to, this getProducst
    //  call kicks off the http request.
    // It is then setup to asynchronously receive data and
    //  notifcatiosn from the observable
    // Not using the returned value here since  we have not provided an option for the user to cancel the request
    this.productService.getProducts().subscribe(
      // The first function passed to the subscribe method
      //  function(products) { this.products = products, etc }
      // specifies the action to take whenever the observable emits an item
      // The method paramater (products) is that emitted item.
      // Since http operations are single asynchronous operations,
      //  only a single item is emitted which is the http reposne object
      //  that was mapped to our product array in the service, so the
      //  parameter is our array of products
      products => {
        this.products = products, // This code then sets the local products property to the returned array of products
        this.filteredProducts = this.products;
      },
      // Casting opertaor, casting error returned from observable to any type
      error => this.errorMessage = <any>error
    );


    /*
      Observable wont start emitting values until subscribe is called
      So, when we are ready to receive values in our component, we call subscribe
      Subscribe method takes up to 3 args: each providing a handler function

        1st is often called a next function because it processes the next emitted value
        Since obs emit values over time, then next function is called for each value it emits

            x.subscribe(nextFn)

        2nd argument is an erorr function

            x.subscribe(nextFn, errorFn)

        3rd optional is function to execute on completion

            x.subscribe(nextFn, errorFn, completeFn)

      The subscribe function returns a subscription

            let sub = x.subscribe(nextFn, errorFn, completeFn)
      */


    // move this into subscribe
    // this.filteredProducts = this.products;
  }
}
