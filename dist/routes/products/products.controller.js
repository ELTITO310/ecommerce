"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.edit = exports.create = exports.findOne = exports.findAll = void 0;
const findAll = async (req, rep) => {
    try {
        const products = await req.db.product.find();
        rep.status(200).send({
            status: 200,
            products,
            message: 'Sucessfully get all products'
        });
    }
    catch (e) {
        rep.status(500).send({
            status: 500,
            message: e.message,
            error: e
        });
    }
};
exports.findAll = findAll;
const findOne = async (req, rep) => {
    const product = await req.db.product.findOneBy(req.params.id);
    rep.send({
        status: 200,
        product,
        message: 'Successfully get product'
    });
};
exports.findOne = findOne;
const create = async (req, rep) => {
    try {
        const { name, description, photo, price } = req.body;
        const product = req.db.product.create({ name, description, photo, price });
        await req.db.product.save(product);
        console.log(product.id.toString());
        rep.status(201).send({
            message: 'Product create successfully',
            status: 201,
            id: product.id.toString()
        });
    }
    catch (err) {
        rep.status(500).send({
            message: err.message,
            status: 500,
        });
    }
};
exports.create = create;
const edit = async (req, rep) => {
    const dates = req.body;
    if (!Object.keys(dates).length) {
        rep.status(400).send({
            status: 400,
            message: 'At least 1 parameter is needed. Body/name/description/price/photo'
        });
    }
    await req.db.product.update({ id: req.params.id }, Object.assign({}, dates));
    rep.status(200).send({
        status: 200,
        message: 'Update successfully product'
    });
};
exports.edit = edit;
const deleteProduct = async (req, rep) => {
    await req.db.product.delete({ id: req.params.id });
    rep.status(200).send({
        status: 200,
        message: 'Delete successfully product'
    });
};
exports.deleteProduct = deleteProduct;
