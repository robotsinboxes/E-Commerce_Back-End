const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// home route waits for all categories, includes Product table, stores in categoryData
router.get('/', async(req, res) => {
  try {
    const categoryData = await Category.findAll({ 
      include: [{ model: Product }]
    });
    // is all goes well, send categoryData
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route that takes in a category ID as parameter
router.get('/:id', async(req, res) => {
    // finds category by primary key based on parameter, linking to the product table
  try {
    const categoryData = await Category.findByPk(req.params.id, { 
      include: [{ model: Product }],
    });
    // if there is no category ID, send error
    if(!categoryData) {
      res.status(404).json({ message: 'Category does not exist' });
      return;
    }
    // otherwise send categaryData
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 
router.post('/', async(req, res) => {
  try {
    const categoryCreate = await Category.create(req.body);
    res.status(200).json(categoryCreate);
  } catch (err) {
    res.status(400).json(err);
}});

router.put('/:id', async(req, res) => {
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryUpdate) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
