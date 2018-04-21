const router = require('express').Router();
const item = require('../controllers/items_controller');
const uploadFile = require('../middleware/upload');

router.get('/show', item.getItems);

router.post('/add', 
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS, 
            item.addItems);

router.post('/image',
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS, 
            item.uploadImg)

router.put('/update/:id', 
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS,
            item.updateItems);

router.delete('/delete/:id', item.deleteItems);

module.exports = router