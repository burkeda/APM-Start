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

/* Ang modules provide the env to resolve directives and pipes in our
  components' templates.

  Aggregate and re-export: Modules are a great way to selectively aggregate
  classes from other modules.  And re-export them in a consilidated convenience model.  BrowserModule HttpModule, Router Module are all examples of this.

  We'll build our own convenience module when we build a share module later.

  An Angular module can be eagerly loaded when app starts or can be lazy loaded
  asynchronously by the router. (out of scope of this course, but in her ang routing course)

  Lazy loading is out of scope in this course, but is in her Angular routing course.

  How does an ang module org our app?
  It(an Angular module) declares each compoenent directive and pipe that it manages.
  Every c,d,p we create belongs to an angular module.

  ....... Template Resolution Environment ....................................................................

  A module can export these other types too: making them available for other modules to use

  An angular module also imports other angular modules, this brings in the exported
  functionality from those imported modules.

  An ang module can register service providers with the angular injector,
  making the services available to any class in the app.

  Think of the Angular module as a box, declaring components, if any of those components need functionality, that functionality also needs to be defined within this box.

    Ex. The app component sets up the routing for our app,
        Its needs the RouterModule to do that

  Saying this another way: for each component that belongs to an angular module,
  that ang module provides the env for template resolution.

  The module defines which set of components, directives, pipes are available to
  the component's template.

  Each declared component's template is resolved using only the capabilities
  provided in that module.

    Ex: Product List component

  For Star component which uses the directive we created,  so the star component
  must be available in this module.  Since we created this component,

  Since we created this component, we can either declare the star comp
  within the module directly(ProductList) or  we can import another module that exports
  the start comp.

  Importing an ang module brings in the functionality exported by that module.
  We can do one or the other, never both.

  We didn’t need to think about template resolution in our sample app up to now
  because all of our pieces our in one Ang module - app,module.ts.

  Need to keep template resolution in mind as we split our app into separate modules.


 */
@NgModule({
  /*
    ... Declarations array ...............................................................

    What we've defined in our app as far as components, directives and pipes

    Every comp, dir, and pipe we create mus belong to one and only one ang module

    In our app so far all c,d,p are defined in one module … the app module.

    It would be better to divide the components into mutliple ang modules with basic app pieces in the app module
    and other feature pieces in feature modules.

    As we separate out our pieces we need to remember that each c,d,p belongs to one and only one ang module

    Only declare comp, dir, and pipes.  Do not add other classes or service, etc.

    Never re-declare comp, dir, pipes that belong to another module.

  */
  declarations: [
    AppComponent,
    ProductListComponent,
    ConverToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent
  ],

  providers: [],      // old way.  Since Angular6 use providedIn prop of @Injectable in the service itself.
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // provider: { service } ???
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
    RouterModule.forRoot(
      [
        /*
        When this route is activated, the url segment is appended to the url in browser,
          ex. www.myWebService.com/products

        We can specify the component, it is this components template that is displayed
        when the route is activated

        The order in this array matters
        The router uses a first match win strategy when matching the routes
        More specific routes should always be before less specific
      */
        { path: "products", component: ProductListComponent },
        {
          path: "products/:id",
          canActivate: [ProductDetailGuard], // Array of guards
          component: ProductDetailComponent
        }, // Passing a param
        /*
            We add canActivate and set it to the guards to execute
            before this route is activated
          */
        { path: "welcome", component: WelcomeComponent },
        { path: "", redirectTo: "welcome", pathMatch: "full" },
        /*
          This one defines an empty route ….
          A redirectTo route requires a match property to tell the router how to match the
          url segment to the path of a route.

          We only want this route when the entire client side of the path is empty,
          so we set the pathMatch to full
      */
        { path: "**", redirectTo: "welcome", pathMatch: "full" } // component: PageNotFoundComponent
      ]
      // { useHash: true}
    )
  ],
  /*
    An ang module bootstraps our root application component, defining the
    component needed to display our first template.

    There's a lot of info in here and we're mixing up basic application pieces,  such as our welcome comp with pieces specific to our
    product feature.
    Lets step thru each metadata of NgModule to better understand how we can separate and modularize

    Every ang app has at least one AppModule called the root app module.
    And and ang app has at least one comp called AppComponent called the root appl component
    The AppModule bootstraps the AppComp to provide the Directive used in the index.html file.
      <body>
        <pm-root></pm-root>
      </body>
    The Bootsrap array of the NgModule Decorator defines the comp that is the starting point of the app.
    This is the comp that is loaded when the app is laucnhed

  */
  bootstrap: [AppComponent]
})
export class AppModule {}
