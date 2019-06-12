const fs = require('fs');
const hbs = require('hbs');
listU = [];
listC =[];

function crear(estudiante){
    listar();
    let est = {
        cc: estudiante.documento,
        nombre: estudiante.nombre,
        email: estudiante.email,
        telfono: estudiante.telefono_cel,
        tipo:"e"

    }
    let duplicado = listU.find(nom => nom.cc == estudiante.documento);
    if(!duplicado){
        listU.push(est);
        console.log(listU);
        guardar();
    }else{
        return false;
    }
    
}

const listar = () =>{
    try{
        listU = require('../usuarios');
    }catch(error){
        listU = [];
    }
    
}
const guardar = () =>{
    let datos = JSON.stringify(listU);
    fs.writeFile('usuarios.json',datos,(err)=>{
        if(err) throw (err);
        console.log('Archivo creado con exito');
    })
}

const actualizar = (nom, asignatura, calificacion ) =>{
    listar();

    let encontrado = listE.find(buscar => buscar.nombre == nom );

    if(!encontrado){
        console.log('El estudiante no existe');
    }else{
        encontrado[asignatura] = calificacion;
        guardar();
    }
}

const eliminar = (nom)=>{
    listar();
    let nuevo = listE.filter(n => n.nombre != nom);
    if(nuevo.length == listE.length){
        console.log('Ningun estudinate tiene ese nombre');
    }else{
        listE = nuevo;
        guardar();

    }
}

/////////////////Cursos

const crearCurso =(curso)=>{
    listarCurso();
    let cur = {
        id:parseInt(curso.newId),
        nombre: curso.newNombre,
        des: curso.newDescripcion,
        valor: parseInt(curso.newValor),
        modalidad:curso.newModalidad,
        horas:curso.newHoras,
        estado:"disponible"

    }
    let duplicado = listC.find(c => c.id == curso.newId);
    if(!duplicado){
        listC.push(cur);
        console.log(listU);
        guardarCurso();
    }else{
        return false;
    }
}


const listarCurso = () =>{
    try{
        listC = require('../cursos.json');
    }catch(error){
        listC = [];
    }
    
}
const guardarCurso = () =>{
    let datos = JSON.stringify(listC);
    fs.writeFile('cursos.json',datos,(err)=>{
        if(err) throw (err);
        console.log('Archivo guardado con exito');
    })
}

const mostrarCursos = () =>{
    listarCurso();
    let texto = "<table >\
                    <thead>\
                        <tr>\
                            <th>ID</th>\
                            <th>Curso</th>\
                            <th>Descripción</th>\
                        </tr>\
                    </thead>\
                    <tbody ";

    listC.forEach(curso => {
        texto = texto + 
            '<tr> ' +
            '<td>' + curso.id + '</td>' +
            '<td> ' + curso.nombre + '</td>' +
            '<td> ' + curso.des + '</td>'
    });
    texto = texto + '</tbody></table>'
    return texto;
}

hbs.registerHelper('listar',()=>{
    listarCurso();
    let texto = `<table class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>ID</th>\
                            <th>Curso</th>\
                            <th>Descripción</th>\
                        </tr>\
                    </thead>\
                    <tbody> `;

    listC.forEach(curso => {
        texto = texto + 
            '<tr> ' +
            '<td>' + curso.id + '</td>' +
            '<td> ' + curso.nombre + '</td>' +
            '<td> ' + curso.des + '</td>'
    });
    texto = texto + '</tbody></table>'
    return texto;
})

hbs.registerHelper('listarDispo',()=>{
    listarCurso();
    let texto = `<table id="tbProducto" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>ID</th>\
                            <th>Curso</th>\
                            <th>Descripción</th>\
                        </tr>\
                    </thead>\
                    <tbody> `;

    listC.forEach(curso => {
        if(curso.estado == 'disponible'){
            texto = texto + 
            '<tr> ' +
            '<td>' + curso.id + '</td>' +
            '<td> ' + curso.nombre + '</td>' +
            '<td> ' + curso.des + '</td>'
        }
        
    });
    
    texto = texto + '</tbody></table>'
    return texto;
})



module.exports = {
    crear,
    actualizar,
    eliminar,
    crearCurso,
    mostrarCursos
}