const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    badge: { type: String, required: true },
    bg: { type: String, default: 'from-emerald-100 to-green-50' },
    border: { type: String, default: 'border-emerald-200' },
    badgeColor: { type: String, default: 'text-emerald-800 bg-emerald-200/60' },
    btnColor: { type: String, default: 'bg-emerald-700' },
    emoji: { type: String, default: '🍅' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Banner', bannerSchema);