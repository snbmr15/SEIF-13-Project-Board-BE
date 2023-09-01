
const MyNotes = require('../models/myNotes');

module.exports = {
    createNote: async (req, res) => {
        const noteTitle = req.body.noteTitle;
        const noteText = req.body.noteText;
    
        try {
            const data = new MyNotes({  
                userRef: req.userID,
                noteTitle: noteTitle,
                noteText: noteText,
                noteDate: Date.now(),
            });
    
            await data.save();
    
            res.status(201).send({message: "Note created"});
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    
    },

    getNotes: async (req, res) => {
        const findNotes = await MyNotes.find({ userRef: req.userID });
        try {
            res.status(201).send(findNotes);
        } catch (error) {
            res.status(500).send(error.message);
            console.log(error)
        }
    },

    updateNote: async (req, res) => {
        const myNoteTitle = req.body.noteTitle;
        const myNoteText = req.body.noteText;
        const myNoteId = req.body.noteId;

        try {
            const findNote = await MyNotes.findOneAndUpdate(
                { _id: myNoteId, userRef: req.userID }, // Ensure that the note belongs to the user
                {
                    $set: {
                        noteTitle: myNoteTitle,
                        noteText: myNoteText,
                        noteDate: Date.now()
                    }
                }
            );

            if (findNote.isModified === 1) {
                res.status(201).send({ message: "Note updated successfully" });
            } else {
                res.status(404).send({ message: "Note not found or not updated" });
            }
        } catch (error) {
            res.status(500).send({ message: "An error occurred while updating the note" });
            console.error(error);
        }
    },
    
    deleteNote: async (req, res) => {
        const noteId = req.body.noteId;

        try {
            // Delete the note based on its ID
            const deleteSelectedNote = await MyNotes.deleteOne({ _id: noteId });

            if (deleteSelectedNote.deletedCount === 1) {
                res.status(201).send({ message: "Note deleted" });
            } else {
                res.status(404).send({ message: "Note not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "An error occurred while deleting the note" });
            console.error(error);
        }
    }
};
