const ProductModel = require("../models/Product");

exports.GetIndex = (req, res, next) => {
  //arrow functions
  ProductModel.GetAll(function (products) {
    res.render("shop/index", {
      pageTitle: "Itla Peliculas",
      prods: products,
      hasProducts: products.length > 0,
      ShopActive: true,
    });
  });
};

exports.GetProducts = (req, res, next) => {
  //arrow functions
  ProductModel.GetAll(function (products) {
    res.render("shop/product-list", {
      pageTitle: "Peliculas",
      prods: products,
      hasProducts: products.length > 0,
      ProductsActive: true,
    });
  });
};

exports.GetCart = (req, res, next) => {
  //arrow functions
  res.render("shop/cart", {
    pageTitle: "Cart",
    CartActive: true,
  });
};

exports.GetOrders = (req, res, next) => {
  //arrow functions
  res.render("shop/orders", {
    pageTitle: "Orders",
    OrdersActive: true,
  });
};

exports.GetCheckout = (req, res, next) => {
  //arrow functions
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    CartActive: true,
  });
};

exports.GetProduct = (req, res, next) => {

  const productId = req.params.productId;

  //arrow functions
  ProductModel.GetById(productId, (product) => {
    res.render("shop/product-details", {
      pageTitle: "detail",
      ProductsActive: true,
      product: product,
    });
  });
};

   exports.GetFilter = (req, res, next) => {
    const movie = req.body.Filtrar;

    if(movie != "Todos")
    {
    ProductModel.GetFilter(movie,(cb) => {
      res.render("shop/product-list", {
      pageTitle: "Filtros",
      hasProducts: cb.length > 0,
      ProductsActive: true,
      prods: cb
    });
    });
  }else{
    ProductModel.GetAll(function (products) {
      res.render("shop/product-list", {
        pageTitle: "Products",
        prods: products,
        hasProducts: products.length > 0,
        ProductsActive: true,
      });
    });
  }

    
    }
    
   
    exports.GetFilterActivo = (req, res, next) => {
      const estatus = req.body.Activa;

      if (estatus == "Activa"){
    
      ProductModel.GetfilterActivo((cb) => {
        res.render("shop/index", {
          pageTitle: "Activas",
          hasProducts: cb.length > 0,
          ProductsActive: true,
          prods: cb
        });
      });
    }
  }
  



