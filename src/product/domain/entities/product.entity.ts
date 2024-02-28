export class ProductEntity {

  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  constructor(_id: string, name: string, description: string, price: number, stock:number) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }

  validateStock(stock: number): boolean {
    return stock > 0;
  }

  validatePrice(price: number): boolean {
    return price > 0;
  }

}
