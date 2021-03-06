const mongoose = require('mongoose'); // move to controller
const Product = require('../models/product.server.model');

//READ
exports.productsGetAll = (req, res, next) => {
	Product.find()
		.select('name price _id productImage') //select the only fields you want to get
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				products: docs.map(doc => {
					return {
						name: doc.name,
						price: doc.price,
						productImage: doc.productImage,
						_id: doc._id,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/products/' + doc._id
						}
					};
				})
			};
			// console.log(docs);
			//Wrap in if to manage no entries database response. Uncomment to do that
			// if (docs.length >= 0) {
			res.status(200).json(response);
			// } else {
			//     res.status(404).json({
			//         message: "no entries found"
			//     });
			// }
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
};
//CREATE
exports.productPost = (req, res, next) => {
	console.log(req.file);
	const product = new Product({
		_id: new mongoose.Types.ObjectId, //constructor from Schema
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path //from multer folder
	});
	product.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Created product',
				createdProduct: {
					name: result.name,
					price: result.price,
					_id: result._id,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/products/' + result._id
					}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
};
//GET ONE
exports.productGetOne = (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id)
		.select('name price _id productImage') //select the only fields you want to get
		.exec()
		.then(doc => {
			console.log('from db:', doc);
			if (doc) {
				res.status(200).json({
					product: doc,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/products/'
					}
				});
			} else {
				res.status(404).json({message: 'no valid entry found for provided ID'});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
};
//PATCH
exports.productPatch = (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
	// use for of loop to retrieve all the product properties (name, price) with a dynamic approach, and store in a obj
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({_id: id}, {$set: updateOps})
		.exec()
		.then(() => {
			res.status(200).json({
				message: 'product updated',
				request: {
					type: 'GET',
					url: 'http://localhost:3000/products/' + id
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
};
//DELETE
exports.productDelete = (req, res, next) => {
	const id = req.params.productId;
	Product.remove({_id: id})
		.exec()
		.then(() => {
			res.status(200).json({
				message: 'product deleted',
				request: {
					type: 'POST',
					url: 'http://localhost:3000/products/' + id,
					body: {name: 'String', price: 'Number'}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
};
