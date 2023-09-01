const AddTask = require('../models/addTask');

module.exports = {
    addNewTask: async (req, res) => {
        const {task, date, category } = req.body;
        const userExist = await AddTask.findOne({ userRef: req.userID });
        try {
    
            if(userExist){
                // Convert the date string to a Date object
                const taskDate = new Date(date);
    
                userExist.allTasks.push({
                    task: task,
                    category: category,
                    date: taskDate,
                    taskStatus: "Pending"
                })
    
                await userExist.save();
    
                res.status(201).send({message: "Task added successfully"});
            }
            else{

                // Convert the date string to a Date object
                const taskDate = new Date(date);

                const data = new AddTask({  
                    userRef: req.userID,
                    allTasks: [{
                        task: task,
                        category: category,
                        date: taskDate,
                        taskStatus: "Pending"
                    }]
                });
     
                await data.save();
    
                res.status(201).send({message: "Task added successfully"});
            }
    
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    showTasks: async (req, res) => {
        const findTasks = await AddTask.findOne({ userRef: req.userID });
    
        try {
            if(findTasks){
                let allTasks = findTasks.allTasks;
                res.status(201).send(allTasks);
            }
            else{
                res.status(201).send([]);
            }
            
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    updateTask: async (req, res) => {
        const {task, date, category, taskStatus, id} = req.body;
        console.log("70, ", req.body)
        console.log("Received Task:", task);
        console.log("Received Date:", date);
        console.log("Received Category:", category);
        console.log("Received Status:", taskStatus);
        console.log("Received ID:", id);

        try {
                // Convert the date string to a Date object
                const taskDate = new Date(date);


                console.log("82 -", taskDate)
                await AddTask.updateOne(
                { userRef: req.userID, "allTasks._id": id },
                {$set: {
                    "allTasks.$.task": task,
                    "allTasks.$.category": category,
                    "allTasks.$.date": taskDate,
                    "allTasks.$.taskStatus": taskStatus
                }});
                console.log("90 -")
    
                res.status(201).send({message: "Task updated successfully"});
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    deleteSelectedTask: async (req, res) => {
        const taskId = req.params.taskName; // Assuming the task name is passed as a parameter
        
        try {
            const findTasks = await AddTask.findOne({ userRef: req.userID });
    
            if (findTasks) {
                // Filter out the task to be deleted and save the updated list
                findTasks.allTasks = findTasks.allTasks.filter(task => task._id.toString() !== taskId);
                await findTasks.save();
    
                res.status(201).send({ message: "Task Deleted" });
            } else {
                res.status(404).send({ message: "Tasks not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "An error occurred while deleting the task" });
            console.log(error);
        }
    }
    


};
