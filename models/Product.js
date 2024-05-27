const fs = require("fs");
const path = require("path");

const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const GetAllProductsFromFile = function (callBack) {
  fs.readFile(dataPath, function (error, data) {
    if (error) {
      callBack([]);
    } else {
      callBack(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, genro, status,description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.status = status;
    this.genro = genro;
    this.description = description;
  }

  Save() {
    GetAllProductsFromFile((products) => {
      if (this.id) {
        const editProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );

        products[editProductIndex] = this;
        fs.writeFile(dataPath, JSON.stringify(products), function (error) {
          console.log(error);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(dataPath, JSON.stringify(products), function (error) {
          console.log(error);
        });
      }
    });
  }

  static GetAll(cb) {
    GetAllProductsFromFile(cb);
  }

  static GetById(id, cb) {
    GetAllProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  static Delete(id) {
    GetAllProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);

      const newProductList = products.filter((prod) => prod.id !== id);

      fs.writeFile(dataPath, JSON.stringify(newProductList), function (error) {
        console.log(error);
      });
    });
  }

  static GetFilter(genero, cb) {
    GetAllProductsFromFile((products) => {
      const movie = products.filter((p) => p.genro === genero);
      cb(movie);
    });
  };

};
