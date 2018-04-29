const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  created_at: Date
});

NoteSchema.pre('save', function(next) {
  let note = this;

  let date = new Date();
  
  if ( !note.created_at ) {
    note.created_at = date;
  }
});

module.exports = mongoose.model('Note', NoteSchema);
