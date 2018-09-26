import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
      <a class='navbar-brand'>{{ pageTitle }}</a>
      <ul class='nav nav-pills'>
        <li>
          <a class='nav-link' [routerLink]="['/welcome']">Home</a>
        </li>
        <li>
          <a class='nav-link' [routerLink]="['/products']">Product List</a>
        </li>
      </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
  `
  /*
    The router is hosted here.

    Now, we just need to tell angular where to place our views and display the
    routed component's template.

    How do we specify where to display the routed component's template?

    We use the routerOutlet Directive.

    We place that Directive in the host component's template.
    The routed component's view then appears in this location

    When a user navigates to a feature tied to a route with a routerLink directive

    The routerLink uses the link parameters array to compose the url segment,
    the browsers location url is changed to the application's url +
    the composed url's segment.

    The router searches the list of router defnitions and picks the 1st match.

    The router locates and creates an instance of the component
    that is associated to the route.

    The component's view is injected in the location specified by the
    router outlet directive and the page is displayed.

  */


  // <ul class='nav nav-pills'>
  //   <li>
  //     <a [routerLink]="['/welcome']">Home</a>
  //     <a [routerLink]="['/products']">Product List</a>
  //   </li>
  //   <li></li>
  // </ul>

  // we removed the nesting and setup routing instead
  // <div>
  //   <h1>{{ pageTitle }}</h1>
  //   <pm-products></pm-products>
  // </div>

  // requires a  selector: 'pm-products',
  // templateUrl: './product-list.component.html',
})
export class AppComponent {
  // tslint:disable-next-line:no-inferrable-types
  pageTitle: string = 'CIDT';
}
