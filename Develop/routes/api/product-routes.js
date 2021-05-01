const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
  // find all products
    // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({ 
      include: [{ model: Category }] [{ model: Tag }]
    });
    // is all goes well, send productData
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async(req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, { 
      include: [{ model: Category }] [{ model: Tag }],
    });
    // if there is no category ID, send error
    if(!productData) {
      res.status(404).json({ message: 'Product does not exist' });
      return;
    }
    // otherwise send categaryData
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async(req, res) => {
  try {
    const productCreate = await Product.create(req.body);
    res.status(200).json(productCreate);
  } catch (err) {
    res.status(400).json(err);
}});



// update product
router.put('/:id', async(req, res) => {
  try {
    const productUpdate = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!productUpdate) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(productUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async(req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No product with that id' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
