const fs = require('fs');
const hbs = require('hbs');
listU = [];
listC =[];
listM = [];

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
        listC = require('../cursos');
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

const matricular =(matricula) =>{
    listarMatriculas();
    listarCurso();
    listar();
    let m = {
        idCurso: parseInt(matricula.idcur),
        idest: matricula.idEst
    }
    let estd = listU.find(e => e.cc == matricula.idEst);
    let curd = listC.find(c => c.id == matricula.idcur);
    let duplicado = listM.find(ma => ma.idCurso == matricula.idcur && ma.idest == matricula.idEst);
    if(!duplicado){
        if(estd){
            if(curd){
                listM.push(m);
                guardarMatricula();
            }else{
                return "NC"
            }
        }else{
            return "NE"
        }
    }else{
        return false;
    }

}

const listarMatriculas = () =>{
    try{
        listM = require('../matricula');
    }catch(error){
        listM = [];
    }
    
}
const guardarMatricula = () =>{
    let datos = JSON.stringify(listM);
    fs.writeFile('matricula.json',datos,(err)=>{
        if(err) throw (err);
        console.log('Archivo guardado con exito');
    })
}

const mostrarInscritos = (idCurso) => {
    listarMatriculas();
    listar();

    let lstEstudiantes = [];

    let estudiantes = listM.filter(e => e.idCurso == idCurso)

    estudiantes.forEach(est => {
        let e = listU.find(u => u.cc == est.idest);
        lstEstudiantes.push(e);
    });
    console.log(lstEstudiantes);
    return lstEstudiantes;
    
}

const eliminarInscrito = (idEst) => {
    listarMatriculas();
    let nuevo = listM.filter(m => m.idest != idEst);
    listM = nuevo;
    guardarMatricula();
}

const actualizarCurso = (idCurso) => {
    listarCurso();
    let encontrado = listC.find(c => c.id == idCurso);
    curso[estado] = 'cerrado';
    guardarCurso();
}

module.exports = {
    crear,
    actualizar,
    eliminar,
    crearCurso,
    mostrarCursos,
    matricular, 
    mostrarInscritos
}