const fs = require('fs');
const hbs = require('hbs');
listU = [];
listC =[];
listU = [];
listCursos =[];

function crear(estudiante){
    listar();
    let est = {
        cc: estudiante.documento,
        nombre: estudiante.nombre,
        email: estudiante.email,
        telefono_cel: estudiante.telefono_cel,
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

const actualizarE = (nom, asignatura, calificacion ) =>{
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
    console.log(datos);
    fs.writeFile('cursos.json',datos,(err)=>{
        if(err) throw (err);
        console.log('Archivo guardado con exito');
        
    })
}



hbs.registerHelper('listar',(lista)=>{
    
    console.log(lista);
    let texto = `<table id="tb" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>ID</th>\
                            <th>Curso</th>\
                            <th>Descripción</th>\
                            <th>Valor</th>\
                            <th>Estado</th>\
                        </tr>\
                    </thead>\
                    <tbody> `;

    listCursos.forEach(curso => {
        texto = texto + 
            '<tr> ' +
            '<td class ="id">' + curso.id + '</td>' +
            '<td class = "nombre"> ' + curso.nombre + '</td>' +
            '<td> ' + curso.des + '</td>'+
            '<td> ' + curso.valor + '</td>'+
            '<td> <input type = "text"  class = "tipo" value=' + curso.estado +' ></td>'


    });
    listCursos = lista;
    texto = texto + '</tbody></table>'
    return texto;
    
})


const actualizarCurso = (idCurso) => {
    console.log(idCurso);
    
    listCursos.forEach(c => {
        if(c.id == idCurso ){
         c.estado = "Cerrado";
         guardarCurso();
        }
    });
  
}

hbs.registerHelper('masInfo',()=>{
    console.log(msj);
     
})
hbs.registerHelper('listarDispo',(lista)=>{
    listCursos=lista
    console.log(lista);
    let texto = `<table id="tb" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>ID</th>\
                            <th>Curso</th>\
                            <th>Descripción</th>\
                        </tr>\
                    </thead>\
                    <tbody> 
                    `;
lista.forEach(curso => {
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

hbs.registerHelper('comboBoxUsu',()=>{
    listar();
    let texto;
    listU.forEach(usu => {
            texto = texto + 
            '<div class="dropdown">\
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
    Dropdown</button>\
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">\
            <a>'+ usu.cc +'</a>';
            
        
        console.log(usu.cc+'-');
    });
   
    texto = texto + '</div></div>'
    return texto;
})


hbs.registerHelper('listarUsu',(listadoU)=>{
    let texto = `<table id="tb" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>Documento</th>\
                            <th>nombre</th>\
                            <th>telefono</th>\
                            <th>email</th>\
                            <th>tipo</th>\
                            <th>Actualizar</th>\
                        </tr>\
                    </thead>\
                    <tbody> 
                    `;

       listadoU.forEach(usu => {
       if(usu.tipo == 'a'){
        texto = texto + 
        '<tr> ' +
        '<td><input type = "text"  class = "documento" id="documento" value='+usu.documento+' ></td>' +
        '<td> <input type = "text"  class = "nombre" value='+usu.nombre+' ></td>' +
        '<td> <input type = "text"  class = "telefono" value='+usu.telefono_cel+' ></td>' +
        '<td> <input type = "text"  class = "email" value='+usu.email+' ></td>' +
        '<td> <input type = "text"  class = "tipo" value='+usu.tipo+' ></td>'+
        '<td><button class="btn btn-primary">Actualizar</button></td>'
       }
           
        
        
    });
    
   
    texto = texto + '</tbody></table>'
    return texto;
})

hbs.registerHelper('actualizarUsuarios',(cc, nombre, email, telefono_cel, tipo)=>{
    listar();

    let encontrado = listE.find(buscar => buscar.cc == cc );

    if(!encontrado){
        console.log('El usuario no existe');
    }else{
        cc=cc;
        nombre=nombre;
        email=email;
        telefono_cel=telefono_cel;
        tipo=tipo;
        guardar();
    }
})

const actualizarUsuarios = (cc, nombre, email, telefono_cel, tipo) =>{
    listar();

    let encontrado = listE.find(buscar => buscar.cc == cc );

    if(!encontrado){
        console.log('El usuario no existe');
    }else{
        cc=cc;
        nombre=nombre;
        email=email;
        telefono_cel=telefono_cel;
        tipo=tipo;
        guardar();
    }
}
  
hbs.registerHelper('buscar',(id)=>{
    listarCurso();
    let texto = listcC.find(buscar => buscar.id == id );
    return texto.nombre;
})



const eliminarCurso = (id) => {
    listarCurso();
    let idC = parseInt(id);
    let cursoId = listC.filter(c =>c.id != idC);
    listC = cursoId;
    guardarCurso();
};
var msj;
const informacion = (id) => {
    let idC = parseInt(id);
    let cursoId = listCursos.filter(c =>c.id == idC);
    var yourval = JSON.stringify(cursoId);
    console.log(listCursos);
    cursoId.forEach(element => {
        msj=(`El curso ${element.nombre}, tiene un 
        valor de ${element.valor}, con modalidad ${element.modalidad}
        de ${element.horas} horas:
        ${element.des}`);
    });
    
        return msj;
};

hbs.registerHelper('mostrar',()=>{
    console.log(msj);
    let t = `<div class="alert alert-primary" role="alert">\
            `+msj+`
    <tbody> 
    `;
    t = t + '</tbody></div>'
    return t;
})

module.exports = {
    crear,
    actualizarCurso,
    eliminar,
    crearCurso,
    eliminarCurso,
    informacion,
    actualizarUsuarios
}