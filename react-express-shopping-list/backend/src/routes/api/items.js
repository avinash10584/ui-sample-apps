import express from 'express';
import Item from '../../models/Item';

const router = express.Router();
// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then((items) => { res.json(items); });
});

// @route POST api/items
// @desc Create item
// @access Public
router.post('/', (req, res) => {
    Item.create({
        name: req.body.name,
    }).then(item => res.json(item));
});


// @route POST api/items/:id
// @desc Create item
// @access Public
router.delete('/:id', (req, res) => {
    Item.deleteOne(Item.findById(req.params.id))
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json({ success: false, error: err.trace }));
});

export default router;
