const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (request, response) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[Product]
  }).then(data=>{
    response.json(data)
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

router.get('/:id', (request, response) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(request.params.id, {
    include:[{
      model:Product,
      include:[Tag]
  }]
  }).then(data=>{
    if(data){
       return  response.json(data);
    } else {
      response.status(404).json({
            msg:"no such record"
        })
    }
}).catch(err=>{
    console.log(err);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

router.post('/', async (request, response) => {
  // create a new tag
  Tag.create(request.body).then(data=>{
    response.status(201).json(data)
}).catch(err=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

router.put('/:id', (request, response) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name:request.body.tag_name
},{
    where:{
        id:request.params.id
    }
}).then(data=>{
    if(data[0]){
        return response.json(data)
    } else {
        return response.status(404).json({msg:"no such record"})
    }
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

router.delete('/:id', (request, response) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
        id:request.params.id
    }
}).then(data=>{
    if(data){
        return response.json(data)
    } else {
        return response.status(404).json({msg:"no such record"})
    }
}).catch(err=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

module.exports = router;
