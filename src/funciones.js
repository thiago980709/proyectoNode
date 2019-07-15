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

const listarCursosDisponibles = () =>{
    try{
        listC = require('../cursos.json');
        let nuevo = listC.filter(c => c.estado != 'cerrado');
        if(listC.length == nuevo.length){
            console.log('Todos los cursos estan disponibles');
        } else {
            listC = nuevo;
        }
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

      lista.forEach(curso => {
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

hbs.registerHelper('listarCursosInscritos', () => {
    listarCursosDisponibles();
    let texto = "";
    listC.forEach(curso => {
        let lstEstudiantes = mostrarInscritos(curso.id);
        texto = texto + 
            '<p>' +
            '<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample' + curso.id +'" aria-expanded="false" aria-controls="collapseExample' + curso.id +'">' +
              curso.nombre +
            '</button>' +
          '</p>' + 
          '<div class="collapse" id="collapseExample' + curso.id +'">' +
            '<div class="card card-body">' + 
                `<table id="tb" class="table table-hover" >\
                <thead>\
                    <tr>\
                        <th>Documento</th>\
                        <th>Nombre</th>\
                        <th>Correo</th>\
                        <th>Telefono</th>\
                        <th>Eliminar</th>\
                    </tr>\
                </thead>\
                <tbody> `;

                lstEstudiantes.forEach(est => {
                    texto = texto + 
                        '<tr> ' +
                        '<td class ="id">' + est.cc + '</td>' +
                        '<td class = "nombre"> ' + est.nombre + '</td>' +
                        '<td> ' + est.email + '</td>'+
                        '<td> ' + est.telfono + '</td>'+
                        '<td> <button class="btn btn-danger">Eliminar</button></td>'
                });

                texto = texto + '</tbody></table>' +
              
            '</div>' +
          '</div>';
    });
    return texto;
});


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
    listCursos=lista;
    console.log(lista);
    let texto = `<table id="tb" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>ID</th>\
                            <th>Curso</th>\
                            <th>Descripción</th>\
                            <th>Docente</th>\
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
            '<td> ' + curso.des + '</td>' +
            '<td> ' + curso.docente + '</td>'
        }
        
    });
    
   
    texto = texto + '</tbody></table>'
    return texto;
})

hbs.registerHelper('listarMisCur',(lista, doc, cursos)=>{
    console.log(doc);
    let texto = `<table id="tb" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>ID</th>\
                            <th>Nombre</th>\
                            <th>Descripción</th>\
                        </tr>\
                    </thead>\
                    <tbody> 
                    `;
    lista.forEach(mat => {
        if(mat.documento == doc){
            cursos.forEach(cur=>{
                if(mat.id == cur.id){
                    texto = texto + 
                    '<tr> ' +
                    '<td>' + cur.id + '</td>' +
                    '<td> ' + cur.nombre + '</td>' +
                    '<td> ' + cur.des + '</td>'
                }
            })
        }
    });
    texto = texto + '</tbody></table>'
    return texto;
})

hbs.registerHelper('listarProf',(lista, docente)=>{
    listCursos=lista;
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
        if(curso.docente == docente){
            if(curso.estado == 'disponible'){
                texto = texto + 
                '<tr> ' +
                '<td>' + curso.id + '</td>' +
                '<td> ' + curso.nombre + '</td>' +
                '<td> ' + curso.des + '</td>'
            }
        }
    });
    
   
    texto = texto + '</tbody></table>'
    return texto;
})

hbs.registerHelper('comboBoxUsu',()=>{
    let texto;
    listCursos.forEach(cur => {
            texto = texto + 
            '<div class="dropdown">\
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
    Dropdown</button>\
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">\
            <a>'+ cur.nombre +'</a>';
            
        
        console.log(cur.nombre+'-');
    });
   
    texto = texto + '</div></div>'
    return texto;
})


hbs.registerHelper('listarUsu',(listado,listadoU,listadoC, selec)=>{
    let texto = `<table id="tb" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>Documento</th>\
                            <th>nombre</th>\
                            <th>telefono</th>\
                            <th>email</th>\
                            <th>tipo</th>\
                        </tr>\
                    </thead>\
                    <tbody> 
                    `;
    listado.forEach(mat=>{
        if(mat.id == selec){
            listadoU.forEach(usu=>{
                if(mat.documento == usu.documento){
                    texto = texto + 
                    '<tr> ' +
                    '<td>'+usu.documento+'</td>' +
                    '<td>'+usu.nombre+'</td>' +
                    '<td>'+usu.telefono_cel+'</td>' +
                    '<td>'+usu.email+'</td>' +
                    '<td>'+usu.tipo+'</td>'
                }
            })
        }
    })
                    /*
        listadoU.forEach(usu=>{    
                listadoC.forEach(cur=>{
                    listado.forEach(mat=>{
                        if(usu.tipo == 'a'){
                            if(usu.documento == mat.documento){
                                if(mat.id == cur.id){
                                    texto = texto + 
                                    '<tr> ' +
                                    '<td>'+usu.documento+'</td>' +
                                    '<td>'+usu.nombre+'</td>' +
                                    '<td>'+usu.telefono_cel+'</td>' +
                                    '<td>'+usu.email+'</td>' +
                                    '<td>'+usu.tipo+'</td>'+
                                    '<td>'+cur.nombre+'</td>' 
                                }
                            } 
                        }
                    })
                })
            })
        */
    texto = texto + '</tbody></table>'
    return texto;
})

hbs.registerHelper('roles',(listado)=>{
    let texto = `<table id="tb" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>Documento</th>\
                            <th>nombre</th>\
                            <th>telefono</th>\
                            <th>email</th>\
                            <th>tipo</th>\
                        </tr>\
                    </thead>\
                    <tbody> 
                    `;
    listado.forEach(usu=>{
       
                    texto = texto + 
                    '<tr> ' +
                    '<td>'+usu.documento+'</td>' +
                    '<td>'+usu.nombre+'</td>' +
                    '<td>'+usu.telefono_cel+'</td>' +
                    '<td>'+usu.email+'</td>' +
                    '<td>'+ usu.tipo +'</td>'
                
    })
    texto = texto + '</tbody></table>'
    return texto;
})

hbs.registerHelper('actualizarUsu',(nombre,documento, email,telefono_cel,tipo)=>{
    let texto = `<table id="tb" class="table table-hover" >\
                    <thead>\
                        <tr>\
                            <th>Documento</th>\
                            <th>nombre</th>\
                            <th>telefono</th>\
                            <th>email</th>\
                            <th>tipo</th>\
                        </tr>\
                    </thead>\
                    <tbody> 
                    `;
    
                    texto = texto + 
                    '<tr>' +
                    '<td> <input type = "text" name="documento" id="documento" class = "tipo" value=' + documento +' ></td>'+
                    '<td> <input type = "text" name="nombre" id="nombre" class = "tipo" value=' + nombre +' ></td>'+
                    '<td> <input type = "text" name="telefono_cel" id="telefono_cel" class = "tipo" value=' + telefono_cel +' ></td>'+
                    '<td> <input type = "text" name="email" id="email" class = "tipo" value=' + email +' ></td>'+
                    '<td> <input type = "text" name="tipo" id="tipo" class = "tipo" value=' + tipo +' ></td>'
                    +'</tr>' 
                
   
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

const matricula = (id) => {
    let idC = parseInt(id);
    let cursoId = listCursos.filter(c =>c.id == idC);
    console.log(listCursos);
    cursoId.forEach(element => {
        msj=(`Se ha matriculado satisfactoriamente a  ${element.nombre} `);
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


const cursosEst = (cedula) =>{
    listarCurso();
    listarMatriculas();
    listar();
    l = [];
    let ma = listM.filter(m => m.idest == cedula);
    let cur;
    if(ma.length>0){
        ma.forEach(cu =>{
            cur = listC.filter(c => c.id == cu.idCurso);
            cur.forEach(s =>{
                l.push(s);
                
            })
            
    
        })
        console.log(l);
        if(cur.length>0){
            
            return l;
        }else{
            console.log(cur);
        }
    }else{
        return false;
    }
    

}
hbs.registerHelper('listarMC',()=>{
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
    //console.log("ff " + l);
    l.forEach(curso => {
        
        texto = texto + 
        '<tr> ' +
        '<td>' + curso.id + '</td>' +
        '<td> ' + curso.nombre + '</td>' +
        '<td> ' + curso.des + '</td>'
        
        
    });
    
   
    texto = texto + '</tbody></table> <form class="form-inline" action="./misCursos" method="POST">\
    <label class="sr-only" for="inlineFormInputName2">Name</label>\
    <input type="text" class="form-control mb-2 mr-sm-2" name="idc" placeholder=" ID curso a eliminar" required>\
    <button type="submit" class="btn btn-primary mb-2">Eliminar</button></form>'
    return texto;
})
  

module.exports = {
    crear,
    actualizarCurso,
    eliminar,
    crearCurso,
    matricular, 
    mostrarInscritos,
    eliminarCurso,
    informacion,
    cursosEst,
    eliminarInscrito,
    actualizarUsuarios,
    matricula
}