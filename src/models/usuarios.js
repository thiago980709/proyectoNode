const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const usuarioSchema = new Schema({
    "nombre":{
        type : String,
        require:true
    },
    "password":{
        type : String,
        require:true
    },
    "documento":{
        type : String,
        require:true
    },
    "email":{
        type : String,
        require:true
    },
    "telefono_cel":{
        type : String,
        require:true
    },
    "tipo":{
        type : String,
        require:true
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario