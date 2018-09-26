import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
/*
  Similar to the HTTP module, Angular provides a Router module in the Angular
  Router Package that registers the router service provider.  To include the features
  of this external module in our application, we need to add it to the imports array
  of our apps Angular Module

  In addition to registering, the router also declares the router directives:
  RouterLink and RouterOutlet.  By importign the Router Module our templates
  can use these or any other router directive
*/

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConverToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailGuard } from './products/product-detail.guard';

// tslint:disable:max-line-length

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConverToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    /*
      This registers the Router Service Provider, declares the Router Directives and
      exposes the configured routes

      Router module also exposes the routes we configure.
      Before we nav to a route we must ensure the routes are available to the app

      How does the router module know about our configured routes?
      We pass them in to the router module by calling the forRoot method
      We then configure the routes here by passing them in by using an array

      We do this by passing the routes to router module like this.
      We call the router modules forRoot method and pass an array of routes to it.
      This establishes the routes for the root of our app.

      If we want to use hash do this:
      forRoot([], { useHash: true })

      The router must be configured with a list of route definitions
      Each definition specifies a route object

      Each route object requires a path - defines url segment for the route
    */
    RouterModule.forRoot([
      /*
        When this route is activated, the url segment is appended to the url in browser,
          ex. www.myWebService.com/products

        We can specify the component, it is this components template that is displayed
        when the route is activated

        The order in this array matters
        The router uses a first match win strategy when matching the routes
        More specific routes should always be before less specific
      */
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id',
        canActivate: [ProductDetailGuard],    // Array of guards
        component: ProductDetailComponent },  // Passing a param
          /*
            We add canActivate and set it to the guards to execute
            before this route is activated
          /*
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      /*
          This one defines an empty route ….
          A redirectTo route requires a match property to tell the router how to match the
          url segment to the path of a route.

          We only want this route when the entire client side of the path is empty,
          so we set the pathMatch to full
      */
       { path: '**', redirectTo: 'welcome', pathMatch: 'full' }  // component: PageNotFoundComponent

    ]
    // { useHash: true}
    )
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
