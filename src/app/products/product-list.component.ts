// tslint:disable:no-inferrable-types
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';


@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})



export class ProductListComponent implements OnInit {

  pageTitle: string = 'Awesome CD list';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  // listFilter: string = 'cart';      // a way to know when the user changes the list filter text

  private _listFilter: string;
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];    // array for holding our filteredProducts list

  products: IProduct[] = [       // any[] = [
    {
      'productId': 1,
      'productName': 'Leaf Rake',
      'productCode': 'GDN-0011',
      'releaseDate': 'March 19, 2016',
      'description': 'Leaf rake with 48-inch wooden handle.',
      'price': 19.95,
      'starRating': 3.2,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png'
    },
    {
      'productId': 2,
      'productName': 'Garden Cart',
      'productCode': 'GDN-0023',
      'releaseDate': 'March 18, 2016',
      'description': '15 gallon capacity rolling garden cart',
      'price': 32.99,
      'starRating': 4.2,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
    },
    {
      'productId': 5,
      'productName': 'Hammer',
      'productCode': 'TBX-0048',
      'releaseDate': 'May 21, 2016',
      'description': 'Curved claw steel hammer',
      'price': 8.9,
      'starRating': 4.8,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
    }
  ];

  constructor() {
    this.filteredProducts = this.products;
    this.listFilter = 'cart';
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

  ngOnInit(): void {
    console.log('In component class ProductList, In OnInit');
  }
}
