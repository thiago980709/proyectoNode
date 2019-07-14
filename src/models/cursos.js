const mongoose = require('mongoose');
const Schema = mongoose.Schema;  

const cursoSchema = new Schema({
    "id":{
        type : Number,
        require:true
    },
    "nombre":{
        type : String,
        require:true
    },
    "des":{
        type : String,
        require:true
    },
    "valor":{
        type : String,
        require:true
    },
    "modalidad":{
        type : String,
    },
    "horas":{
        type : String,
        require:true
    },
    "estado":{
        type : String,
        require:true
    },
    "docente":{
        type : String
    }
})

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso