const chalk = require('chalk');
const Note = require('./models/Note');



async function addNote(fio, phone, problem, owner) {
    await Note.create({ fio, phone, problem, owner });
    console.log(chalk.default.green('Note was added!'));
}

async function getNotes() {
    const notes = await Note.find();
    return notes
}


module.exports = {
    addNote, getNotes
}