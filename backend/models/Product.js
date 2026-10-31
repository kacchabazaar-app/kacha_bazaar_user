const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
    price: { type: Number, required: true },
      oldPrice: { type: Number, default: 0 },
        image: { type: String, required: true },
          category: { type: String, required: true },
            section: { 
                type: String, 
                    enum: ['freshToday', 'featured', 'bestSeller', 'seasonal', 'all'],
                        default: 'all'
                          }
                          });

                          module.exports = mongoose.model('Product', productSchema);