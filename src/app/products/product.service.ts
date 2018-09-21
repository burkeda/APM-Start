import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

// Register with Application Injector
@Injectable({
  // Registering the service with App Injector - we register it in the service, we pass an object
  // into Injectable decorator and set the
  // providedIn property to root so now it is available throughout app
  providedIn: 'root'  // an instance of the service is avail anywhere in app
})

/*

We create a service and use dependency injection to inject that into any component that needs it.

Service:
  A class with a focused purpose
  Used for features that:
    Are independent from any particular component
    Provide shared data or logic across components
    Encapsulate external interactions


How to use a service in a component
	1. Create an instance of the service and use it in the component.
	But, the instance is local to the component, so we cant share data or other resource

	2. Alternatively, we can register the service with Angular.
Angular creates a single instance of the service class called a Singleton and holds onto it


Specifically Angular provides a built in injector.
We register our services with the Angular injector.
The injector creates and manages the single instance of each
registered service which maintains a container of created service instances


If a Compoenet needs the service, the comp class defines the service as a dependency.
The angular injector then provides or injects the service class instance when the component class is instantiated.
This process is called Dependency Injection
Since Angular manages the single instance, any data or logic in that instance is shared by all of the classes that use it.
Recommended way to use services


In Angular this external source is the angu injector


1. How to create a service?
---------------------------------------------
  1. export class
  2. define @Decorator metadata
  3. import what we need


  When building a service we use the @Injectable decorator

2.   Registering the Service
---------------------------------------------
A service is just a regular class until we register it using an Ang Injector

Here we're looking at the root application injector.  It provides the service instance to any componenet
that injects it using the constructor

In addition to root injector, Angular has an injector for each component mirroring the comp tree.

A service registering with the App injector is available to any component or other service in the app

A servbice registered with a specific component is only availabe to that component and its child or nested components.
Ex: if service is registerd with ProductList Component Injector, the service is only available in the
product list comp and child Star component

So, when to register with Root VS. Component?
Example is the star component with stars in each row of table, if we wanted to do some processing or
properties on each star in each row, then we may need to register with component Injector.
Component injector will provide multiple instances of the service ... one for each row for each
set of stars

Root injector is recommended for most cases

We register with root in the service itself(see the @injectable)

To register only for specific comp, register the service in that component ...

--- product-list.component.ts ---
@Component({
  providers: [ProductService]
})


*** Version 6 supports the providedIn injectable in the service(Best Practice: better tree shaking
  (compiler shakes out unused code, for smaller deployed bundles, but older versions you have to register
    the service in a module as a provider like above, but in the app.module-ts

    @NgModule({
      providers: [ProductService]
    })



3.  How to Inject the Service
---------------------------------------------------------

Now we just need to define it as s dependency so the injector will provide the instance as a dependecy
in the classes that need it

How do we do dep inj in typescript?
In the constructor

see product-list.component.ts constructor

*/
export class ProductService {

  // Now identify the location of our webserver
  // setup the pathing angular.json at root:
  //    so Angular knows about the api folder - where product.json lives
  private productUrl = 'api/products/products.json';

  // Angular will then inject the instance of HTTPClient into this
  //    variable in our class ... this is shorcut form
  // We want ang to provide an instance of the Http client service, so we identify it as a deendency in the constructor
  // Ang will then inject the instance of HTTPClient into this variable in our class
  constructor(private http: HttpClient) {   // Dependency Injection

  }
  // tslint:disable:max-line-length
  /*
    Observables
    -------------------------------------------------------------------------
    Reactive extensions represent a sequence as an observable sequence
    Observables are used in Ang event system and its http client service

    Help manage async data
    Treats events as collection
      - An array whose items arrive async over time

    Subscribe to receive notifications (in a component)


    Observable Operators
    ------------------------------------------------------------------------
    Methods on observables that compose new observables
    Transofrm the source observable in some way
    Process each value as it is emitted
    Ex: map, filter, take, merge, tap


    Composing Operators
    -------------------------------------------------------------------------
    Compose operators with the pipe method(pipeable operators)

    Example: using pipe method to compose multiple pipeable operators

      We use the Range Creation method to create an observable stream from 0 - 9 with the goal to
      show how to compose operators with the pipe

        const source$: Observable<number> = range(0, 10); By convention we use a $ suffix to hold an observable, whose type is an observable stream of numbers using the generic argument

      We use the pipe method to pipe this stream through two operators: map and filter

          source$.pipe(
            map(x => x * 3),  ... As each number is emitted by the map operator, the filter operator filters the result to only even numbers
            filter(x => x % 2 === 0)
          );

      BUT, The Observable source does not emit any values until it has a subscriber
          source$.pipe(
            map(x => x * 3),  ... As each number is emitted by the map operator, the filter operator filters the result to only even numbers
            filter(x => x % 2 === 0)
          ).subscribe(x => console.log(x));

      Each number in the sequence is processed throught the pipable operators as it is emitted


    VS Promise
    -------------------------------------------------------------------------
    Promise is not lazy, as soon as Promise is going it's already on its way to being resolved
    Promise provides single future value
    Not cancellable

    Observable
    -------------------------------------------------------------------------
    Emits multiple values over time
    Lazy, cancellable, supports operations like map, filter, reduce, etc

  */
  // We also need to change the return type to an Observable of IProduct[array]
  getProducts(): Observable<IProduct[]> {
    // We set the get method generic parameter to our IProduct[] array
    //  when we get a response back, this get method will auto map
    //  the response to an array of IProducts
    // We also need to change the return type to an Observable of IProduct array
    //  we specify the type of data coming back using the get method's generic parameter.
    // Get method makes getting json easier
    // The get method automatically maps the response object to the defined type, so we don’t have to
    // The get returns an observable because they are asynchronous operations
    /*
      Also, http calls are single async operations … meaning the observable sequence returned from the
      get moethod contains only one element, this element is the http Response object, mapped to the
      type specified in the generic parameter.

      Also the Observable takes advantage of generics to know what type of data is in the sequnce.
      In our case, it’s the array of products

    */
   // We set the get method generic parameter to our IProduct[] array
   // To use these observable operators, we access the pipe method of the observable
   // Then, call pipe method and pass in both operators
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      // Tap: taps into the observable stream and allows us to look at the emitted values in the stream
      // without transforming the stream.  Great to use for debuggin or logging
      tap(data => console.log('ProductService.getProducts() All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );

    /*
    // return [
    //   {
    //     "productId": 1,
    //     "productName": "Leaf Rake",
    //     "productCode": "GDN-0011",
    //     "releaseDate": "March 19, 2016",
    //     "description": "Leaf rake with 48-inch wooden handle.",
    //     "price": 19.95,
    //     "starRating": 3.2,
    //     "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    //   },
    //   {
    //     "productId": 2,
    //     "productName": "Garden Cart",
    //     "productCode": "GDN-0023",
    //     "releaseDate": "March 18, 2016",
    //     "description": "15 gallon capacity rolling garden cart",
    //     "price": 32.99,
    //     "starRating": 4.2,
    //     "imageUrl": "https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    //   },
    //   {
    //     "productId": 5,
    //     "productName": "Hammer",
    //     "productCode": "TBX-0048",
    //     "releaseDate": "May 21, 2016",
    //     "description": "Curved claw steel hammer",
    //     "price": 8.9,
    //     "starRating": 4.8,
    //     "imageUrl": "https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    //   },
    //   {
    //     "productId": 8,
    //     "productName": "Saw",
    //     "productCode": "TBX-0022",
    //     "releaseDate": "May 15, 2016",
    //     "description": "15-inch steel blade hand saw",
    //     "price": 11.55,
    //     "starRating": 3.7,
    //     "imageUrl": "https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    //   },
    //   {
    //     "productId": 10,
    //     "productName": "Video Game Controller",
    //     "productCode": "GMG-0042",
    //     "releaseDate": "October 15, 2015",
    //     "description": "Standard two-button video game controller",
    //     "price": 35.95,
    //     "starRating": 4.6,
    //     "imageUrl": "https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    //   }
    // ];
    */
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // a client side or network error occurred.  Handle accordingly
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend retuend an unsuccessful response code.
      // The response body may contain cluse as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
