const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (request, response) => {
  // find all categories
  // be sure to include its associated Products
//   Category.findAll().then(data=>{
//     response.json(data)
// }).catch(error=>{
//     console.log(error);
//     response.status(500).json({
//         msg:"an error occurred",
//         error:error
//     })
// })
try {
  const categoryData = await Category.findAll({
    // include: [{ model: Product, as: 'category_product'}]
      include:[Product]
  
  });

    if (!categoryData) {
      response.status(404).json({ message: 'No location found with this id!' });
      return;
    }
    response.status(200).json(categoryData);
} catch (err) {
  response.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const oneCategory = await Category.findByPk(req.params.id,{
        include:[Product]
    });
    if(oneCategory) {
       return res.json(oneCategory)
    } else {
        return res.status(404).json({msg:"no such record"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name:req.body.category_name,
},{
    where:{
        id:req.params.id
    }
}).then(data=>{
    if(data[0]){
        return res.json(data)
    } else {
        return res.status(404).json({msg:"no such record"})
    }
}).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
})
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
        id:req.params.id
    }
}).then(data=>{
    if(data){
        return res.json(data)
    } else {
        return res.status(404).json({msg:"no such record"})
    }
}).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
})
});

module.exports = router;
