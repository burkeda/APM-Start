import { Component, OnChanges, Input, EventEmitter, SimpleChanges, Output } from '@angular/core';
// tslint:disable:no-inferrable-types
// tslint:disable:no-trailing-whitespace

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
  // specifies property wants to receive data from outside container
  // and binding is automatically updated by Angular
  // outer container will have prop binding [] in template
  // <pm-star [rating]='product.starRating' />
  @Input() rating: number;
  starWidth: number;

  // If the nested comp wants to send data back out, it can rasie an
  //  event.  The nested comp exposes an event it can use to pass data
  //  out to its container
  // We use the @Output to decorate any property of the nested
  //  component's class, but the prop type must be an Event.
  // The data to pass becomes the event payload.
  // In Angular and event is defined with an EventEmitter object.
  // TypeScript Supports Generics
  // Allows to identify a specific type that the object instance will
  //  work with.  When creating an EventEmitter, the generic argument
  //  identifies the type of the event payload …  as a string.
  // It could also be a number or another object
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();

  // We want the star width recalculated to change anytime the container
  //  rating number changes so we tap in to  onChanges lifecycle hook by
  //  implenting the OnChanges Interface
  // Anytime the container data changes, the ngOnChanges
  //  lifecycle event is generated in Inner Comp and the star width is recalcuated
  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    console.log('In startcomponent class ngOnChanges, setting starWidth = this.rating');
    this.starWidth = this.rating * 75 / 5;
  }

  onClick(): void {
    // ES2015 backticks to specify a string template
    console.log(`In startcomponent class onClick event.  The rating ${this.rating} was clicked!`);

    // setting payload to string
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
 // tslint:disable-next-line:class-name

