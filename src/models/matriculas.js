const mongoose = require('mongoose');
const Schema = mongoose.Schema;  

const matriculaSchema = new Schema({
    "id":{
        type : Number,
        require:true
    },
    "documento":{
        type : String,
        require:true
    }
});

const Matricula = mongoose.model('Matricula', matriculaSchema);
module.exports = Matricula