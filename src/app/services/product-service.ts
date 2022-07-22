export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public description: string,
        public categories: Array<string>) {
    }
}

export class ProductService {
    getProducts(): Array<Product> {
        let tempProducts: Array<Product> = products.map(p => new Product(p.id, p.title, p.price, p.rating, p.description, p.categories));
        return tempProducts;
    }
}

var products = [
    {
        "id": 1,
        "title": "First Product",
        "price": 24.99,
        "rating": 4.3,
        "description": "This is a short description. Lorem ipsum dolor sit amet.",
        "categories": ["electronics", "hardware"],
        "img": 'assets/img/prod1.jpg'
    },
    {
        "id": 2,
        "title": "Second Product",
        "price": 64.99,
        "rating": 3.5,
        "description": "This is a short description. Lorem ipsum dolor sit amet.",
        "categories": ["books"],
        "img": 'assets/img/prod2.jpg'
    },
    {
        "id": 3,
        "title": "Third Product",
        "price": 74.99,
        "rating": 4.2,
        "description": "This is a short description. Lorem ipsum dolor sit amet.",
        "categories": ["electronics"],
        "img": 'assets/img/prod3.jpg'
    },
    {
        "id": 4,
        "title": "Fourth Product",
        "price": 84.99,
        "rating": 3.9,
        "description": "This is a short description. Lorem ipsum dolor sit amet.",
        "categories": ["hardware"],
        "img": 'assets/img/prod4.jpg'
    },
    {
        "id": 5,
        "title": "Fifth Product",
        "price": 94.99,
        "rating": 5,
        "description": "This is a short description. Lorem ipsum dolor sit amet.",
        "categories": ["electronics", "hardware"],
        "img": 'assets/img/prod5.jpg'
    }
];