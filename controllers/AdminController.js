const Product = require("../models/Product");

exports.GetAddProduct = (req, res, next) => {
  res.render("admin/save-product", {
    pageTitle: "Add product",
    AddProductActive: true,
    editMode: false,
  });
};

exports.GetAdminProducts = (req, res, next) => {
  Product.GetAll(function (products) {
    res.render("admin/product-list", {
      pageTitle: "Admin products",
      AdminProductsActive: true,
      prods: products,
      hasProducts: products.length > 0,
    });
  });
};

exports.PostAddProduct = (req, res, next) => {
  const title = req.body.Title;
  const image = req.body.ImageUrl;
  const genro = req.body.Genro;
  const status = req.body.Status;
  const description = req.body.Description;

  const product = new Product(null, title, image, genro, status, description);
  product.Save();

  res.redirect("/");
};

exports.GetEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const edit = req.query.edit;

  if (!edit) {
    return res.redirect("/");
  }

  Product.GetById(productId, (product) => {
    res.render("admin/save-product", {
      pageTitle: "edit products",
      editMode: edit,
      product: product,
    });
  });
};

exports.PostEditProduct = (req, res, next) => {
  const id = req.body.ProductId;
  const title = req.body.Title;
  const image = req.body.ImageUrl;
  const status = req.body.Status;
  const genro = req.body.Genro;
  const description = req.body.Description;

  const product = new Product(id,title,image,genro,status,description);
  product.Save();

  res.redirect("/admin/products");
};

exports.DeleteProduct = (req, res, next) => {
  const id = req.body.ProductId;


  Product.Delete(id);

  res.redirect("/admin/products");
};


