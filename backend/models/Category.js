const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
    icon: { type: String, required: true }, // ইমোজি বা ইমেজ URL
      bg: { type: String, default: 'bg-emerald-100' },
        order: { type: Number, default: 0 }
        });

        module.exports = mongoose.model('Category', categorySchema);