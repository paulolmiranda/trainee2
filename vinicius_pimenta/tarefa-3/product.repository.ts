import { Product } from './product.entity';

export class ProductRepository {
  private products: Product[] = [];
  private nextId = 1;

  findAll(): Product[] { // todos os produtos aqui
    return this.products;
  }

  findById(id: number): Product | undefined { // pegando 1 produto por id!!
    return this.products.find(p => p.id === id);
  }

  create(product: Omit<Product, 'id'>): Product {
    const newProduct = { id: this.nextId++, ...product };
    this.products.push(newProduct); // add produto no array
    return newProduct;
  }

  update(id: number, productData: Partial<Omit<Product, 'id'>>): Product | undefined {
    const product = this.findById(id);
    if (!product) return undefined;
    Object.assign(product, productData);
    return product;
  }

  delete(id: number): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}
