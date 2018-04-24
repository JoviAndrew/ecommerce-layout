const items = require('../models/items');

module.exports = {
    addItems(req, res){    
        console.log('test masuk', req.body)    
        items.create({
            item_name: req.body.name,
            item_img: req.body.img,
            item_price: req.body.price,
        })
        .then(function(response){
            res.status(200).json({
                message: 'success',
                response: response,
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: err,
            })
        })
    },
    updateItems(req, res){
        items.bulkWrite([{
            updateOne: {
                filter: {
                    '_id': req.params.id,
                },
                update: {
                   item_name: req.body.name,
                   item_img: req.body.img,
                   item_price: req.body.price,
                }
            }
        }])
        .then(function(response){
            res.status(200).json({
                message: 'success update data',
                response: response
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: 'Something went wrong when updating the data!',
                err: err
            })
        })

    },
    deleteItems(req, res){
        items.bulkWrite([{
            deleteOne:{
                filter:{
                    '_id': req.params.id
                }
            }
        }])
        .then(function(result){
            res.status(200).json({
                message: 'Success delete data',
                result: result
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: 'Something went wrong deleting item data!',
                err: err,
            })
        })
    },
    getItems(req, res){
        items.find({})
        .then(function(itemData){
            res.status(200).json({
                message: 'Successfully get all items',
                data: itemData
            })
        })
        .catch(function(err){
            res.status(500).json({
                message: err
            })
        })
    },
    uploadImg(req, res){
        res.json({
            message: 'Successfully upload',
            link: req.file.cloudStoragePublicUrl
        })
    }
}