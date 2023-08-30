const Categories = require('../models/newCategory');

module.exports = {
    createTaskCategory: async (req, res) => {
        const {name} = req.body;
        console.log(req.userID)
        const categoriesExist = await Categories.findOne({ userRef: req.userID });
    
        try {
            
            if(categoriesExist){
    
                categoriesExist.allCatogries.push({
                    category: name,
                })
    
                await categoriesExist.save();
    
                res.status(201).send({message: "Category added successfully"});
    
            }
            else{
                const data = new Categories({  
                    userRef: req.userID,
                    allCatogries: [{
                        category: name
                    }]
                });
     
                await data.save();
    
                res.status(201).send({message: "Category added successfully"});
            }
    
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    getAllTaskCategories: async (req, res) => {
        const getCategories = await Categories.findOne({ userRef: req.userID });
        try {
            if(getCategories){
                const allCatogries = getCategories.allCatogries
                res.status(201).send(allCatogries);
            }
            else{
                res.status(201).send([]);
            }
            
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    deleteTaskCategory: async (req, res) => {
        const catId = req.body.catId;

        try {
            const updateCategories = await Categories.updateOne(
                { userRef: req.userID },
                { $pull: { allCategories: { _id: catId } } }
            );

            if (updateCategories.nModified === 0) {
                return res.status(404).send({ message: "Category not found or not modified" });
            }

            const updatedCategories = await Categories.findOne({ userRef: req.userID });
            const allCategories = updatedCategories.allCategories;

            res.status(200).send(allCategories);
        } catch (error) {
            res.status(500).send({ message: "An error occurred while deleting the category" });
            console.error(error);
        }
    }
};
