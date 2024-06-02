const { EatException } = require("./eat-exception");
const { Product } = require("./product");

class Ingestion {
  constructor(meal_type, day_of_diet) {
    this.id = Date.now();
    this.meal_type = meal_type;
    this.day_of_diet = day_of_diet;
    this.products = [];
  }

  setProduct(product) {
    if (product instanceof Product) {
      this.products.push(product);
    } else {
      throw new Error("Invalid product");
    }
  }

  getProductInfo(productName) {
    const product = this.products.find(
      (product) => product.name === productName
    );
    if (product) {
      return { name: product.name, kcal: product.kcal_per_portion };
    } else {
      console.log(`Product not found: ${productName}`);
    }
    return product;
  }

  getFromFridge(productName) {
    const product = this.products.find(
      (product) => product.name === productName
    );
    if (product && product.isJunkFood()) {
      throw new EatException(
        `Too many calories in ${productName} for ${this.meal_type}`
      );
    }
  }
}

module.exports = { Ingestion };
