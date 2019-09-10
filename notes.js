const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = note.find((note) => {
        return (note.title === title);
    });

    if (!duplicateNote) {
        const noteObject = {
            title: title,
            body: body
        }
        notes.push(noteObject);
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Duplicate title!'));
    }
};


const readNote = (title) => {
    const notes = loadNotes();

    const foundNote = notes.find((note) => {
        return (note.title === title);
    });

    if (foundNote) {
        console.log(chalk.yellow(title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

const loadNotes = () => {

    try {
        let dataBuffer = fs.readFileSync('./notes.json');
        let jsonData = dataBuffer.toString();
        return JSON.parse(jsonData);
    } catch (error) {
        return [];
    }
};

const saveNotes = (notes) => {
    let jsonData = JSON.stringify(notes);
    fs.writeFileSync('notes.json', jsonData);
}


const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => {
        return note.title !== title;
    });

    if (filteredNotes.length === notes.length) {
        console.log(chalk.red.inverse('Note not found!'));
    } else {
        saveNotes(filteredNotes);
        console.log(chalk.green.inverse(title + ' removed!'));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow('Your Notes'));
    notes.forEach( (note) => {
        console.log(note.title);
    });
}


module.exports = {
    addNote: addNote,
    readNote: readNote,
    loadNotes: loadNotes,
    removeNote: removeNote,
    listNotes: listNotes
};