const router = require('express').Router();
const item = require('../controllers/items_controller');
const uploadFile = require('../middleware/upload');

router.get('/show', item.getItems);

router.post('/add', item.addItems);

router.post('/upload',
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS, 
            item.uploadImg)

router.put('/update/:id', 
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS,
            item.updateItems);

router.delete('/delete/:id', item.deleteItems);

module.exports = router