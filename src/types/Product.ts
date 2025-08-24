export interface Product {
  _id: string;
  category: {
    _id: string;
    name: string;
    description?: string;
  };
  product_name: string;
  image: string;
  product_description: string;
}
