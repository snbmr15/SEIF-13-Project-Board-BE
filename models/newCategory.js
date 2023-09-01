const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const newCategorySchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    allCategories: [
        {
            category: {
                type: String,
                required: true 
            },
        }
    ]
});

const Categories = mongoose.model('Categories', newCategorySchema);

module.exports = Categories;
