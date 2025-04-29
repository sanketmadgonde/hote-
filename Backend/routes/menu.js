import express from 'express';
  import MenuItem from '../models/MenuItem.js';
  
  const router = express.Router();
  
  router.get('/api/menu', async (req, res) => {
    try {
      const items = await MenuItem.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching items', error });
    }
  });
  
  router.post('/api/menu', async (req, res) => {
    console.log(req.body);
    
    try {
      const newItem = new MenuItem(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: 'Error adding item', error });
    }
  });
  
  router.put('/api/menu/:id', async (req, res) => {
    try {
      const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error updating item', error });
    }
  });
  
  router.delete('/api/menu/:id', async (req, res) => {
    try {
      const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
      if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
      res.json({ msg: 'Item deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item', error });
    }
  });
  
  export default router;
