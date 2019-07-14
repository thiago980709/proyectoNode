require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const dirNode_modules = path.join(__dirname, '../node_modules')
const funciones = require('./funciones');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const Curso = require('./../src/models/cursos');
const Usuario = require('./../src/models/usuarios');
const Matricula = require('./../src/models/matriculas');

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({ extended: false }));
//Bootstrap
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
app.set('view engine', 'hbs');

var doc = process.env.DOC;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/crearCurso', (req, res) => {
    res.render('crearCurso', {
        est: req.body.nombre
    });
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/inscribir', (req, res) => {
    res.render('crearCurso');
});

app.get('/misCursos', (req, res) => {
   Matricula.find({}).exec((err, respuesta1) => {
        Curso.find({}).exec((err, respuesta2) => {
            if (err) {
                return console.log(err)
            }
            res.render('misCursos', {
                listado: respuesta1,
                doc:DOC,
                cursos:respuesta2
            });
        });
   });
});

app.post('/eliminarIns',(req, res)=>{
    console.log('---------------------------');
    console.log(req.body);
    Matricula.findOneAndDelete({id : req.body.id},req.body, (err, resultados)=>{
      if(err){
          return console.log(err)
      }
      console.log(resultados);
        res.render('index', {
                nombre: 'Se eliminó inscripción'+resultados
        })
    })
});
app.post('/cordEliminarIns',(req, res)=>{
    console.log('---------------------------');
    console.log(req.body);
    Matricula.findOneAndDelete({documento : req.body.documento},req.body, (err, resultados)=>{
      if(err){
          return console.log(err)
      }
      console.log(resultados);
        res.render('index', {
                nombre: 'Se eliminó inscripción'+resultados
        })
    })
});

app.get('/actualizarUsu',(req, res)=>{
    res.render('actualizarUsu');
})

app.post('/actualizarUsu',(req, res)=>{
      Usuario.findOneAndUpdate({documento : req.body.documento},req.body,{new:true, useFindAndModify: false},(err, resultados)=>{
        console.log(resultados);
      console.log('---------------------------');
        res.render('index', {
                nombre:resultados.nombre,
                password:resultados.password,
                documento:resultados.documento,
                email:resultados.email,
                telefono_cel:resultados.telefono_cel,
                tipo:'p'
        })
      })
      
   
});

app.get('/registro', (req, res) => {
    res.render('registro');
});
app.post('/indexU', (req, res) => {
    DOC =  req.body.documento;
    let usuario = new Usuario({
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, 10),
        documento: req.body.documento,
        email: req.body.email,
        telefono_cel: req.body.telefono_cel,
        tipo: 'a'
    })
    //console.log(req.body);
    usuario.save((err, resultado) => {
        if (err) {
            res.render('indexU', {
                err: err
            })
        }
        res.render('indexU', {
            err: resultado
        })
    })

});

app.post('/ingresar',(req, res) => {
    DOC= req.body.documento;
    Usuario.findOne({nombre : req.body.nombre}, (err, resultados =>{
        if(err){
            return console.log(err)
        }
        if(!resultado){
            res.render('ingresar', {
                mensaje: "Usuario no encontrado"
            })
        }
        if(!bcrypt.compareSync(req.body.password, resultados.password)){
            res.render('ingresar', {
                mensaje: "Contraseña no es correcta"
            })
        }
        res.render('ingresar', {
                mensaje: "Bienvenido" + resultados.nombre
        })
    }))
})

app.post('/curso', (req, res) => {
    let curso = new Curso({
        id: req.body.newId,
        nombre: req.body.newNombre,
        des: req.body.newDescripcion,
        valor: req.body.newValor,
        modalidad: req.body.newModalidad,
        horas: req.body.newHoras,
        estado: 'disponible'
    })
    console.log(req.body);
    curso.save((err, resultado) => {
        if (err) {
            res.render('crearCurso', {
                err: err
            })
        }
        res.render('crearCurso', {
            err: resultado
        })
    })
})
app.post('/in', (req, res) => {
    
    Usuario.findOne({nombre : req.body.nombre}, (err, resultados) =>{
        console.log(resultados);
        DOC=resultados.documento;
        if(resultados!=null){
            if(bcrypt.compareSync(req.body.password, resultados.password)){
               if(resultados.tipo == 'a'){
                    res.render('indexU', {
                        est: resultados.nombre,
                        cc: resultados.cc
                    })
               }else{
                    res.render('indexC', {
                        est: resultados.nombre
                    })
                }               
            }
            res.render('login', {
                mensaje: "Error en la contraseña"
            })
        }else{
            res.render('login', {
                mensaje: "Error en el nombre"
            })
        }  
    })
});

app.get('/verCursos', (req, res) => {
    Curso.find({}).exec((err, respuesta) => {
        if (err) {
            return console.log(err)
        }
        let lista = respuesta;

        res.render('verCursos', {
            listado: respuesta
        })


    })

});
app.get('/verCursosI', (req, res) => {
    Curso.find({}).exec((err, respuesta) => {
        if (err) {
            return console.log(err)
        }
        let lista = respuesta;

        res.render('verCursosI', {
            listado: respuesta
        })

    })

});

app.post('/eliminar', (req, res) => {
    if (funciones.eliminarCurso(req.body.id) == false) {
        console.log(req.body.id);
        res.render('verCursos', {

            err: 'No se eliminó'
        });
    } else {
        res.render('verCursos', {

            err: ' se eliminó'

        });
    }
});

app.post('/matricula', (req, res) => {
    
    console.log("-------------------------------------");
    funciones.matricula(req.body.id);
    Curso.find({}).exec((err, respuesta) => {
        if (err) {
            return console.log(err)
        }
        //console.log(res);
        let lista = respuesta;

        res.render('verCursosI', {
            listado: respuesta
        })

    })

    let matricula = new Matricula({
        id: req.body.id,
        documento: DOC,
        
    })
    
    matricula.save((err, resultado) => {
        if (err) {
            res.render('verCursosI', {
                err: err
            })
        }
        res.render('verCursosI', {
            listado: resultado
        })
    })
    
});

app.post('/informacion', (req, res) => {
    console.log(req.body.id);
    funciones.informacion(req.body.id);
    Curso.find({}).exec((err, respuesta) => {
        if (err) {
            return console.log(err)
        }
        //console.log(res);
        let lista = respuesta;

        res.render('verCursosI', {
            listado: respuesta
        })

    })
    /*
    if(funciones.informacion(req.body.id) == false){
        console.log(req.body.id);
        res.render('verCursosI',{
            
            err:'no se accedio a la info'
        } );
    }else{
        res.render('verCursosI',{
            
            err:'Info accedida correctamente'
            
        } );
    }
    */

});
/**
 * app.post('/actualizarCurso',(req,res)=>{
    Curso.findOneAndUpdate({id : req.body.id},req.body,{new:true, useFindAndModify: false},(err, resultado)=>{
       console.log(resultado);
        if(err){
            return console.log(err)
        }
         let curso = new Curso({
        id:req.body.id,
        nombre: resultado.nombre,
            des: resultado.des,
            valor: resultado.valor,
            modalidad: resultado.modalidad,
            horas: resultado.horas,
            estado: 'Cerrado'
    }) 
    //console.log(req.body);
    curso.save((err,resultado)=>{
       if(err){
        res.render('verCursos', {
            err:err
        })
       }
       res.render('login')
    })
        
    });
});
 */

app.post('/actualizarCurso', (req, res) => {

    Curso.findOneAndUpdate({ id: req.body.id }, req.body, { new: true, useFindAndModify: false }, (err, resultado) => {
        console.log(resultado);
        if (err) {
            return console.log(err)
        }
        res.render('login', {
            nombre: resultado.nombre,
            des: resultado.des,
            valor: resultado.valor,
            modalidad: resultado.modalidad,
            horas: resultado.horas,
            estado: 'Cerrado'
        })
    });
});
app.get('/actualizarCurso', (req, res) => {
    res.render('verCursos');
    /*
    console.log(req.body.id);
    funciones.actualizarCurso(req.body.id)
    Curso.find({}).exec((err, respuesta)=>{
        if(err){
            return console.log(err)
        }
        //console.log(res);
        let lista= respuesta;
       
        res.render('verCursos', {
            listado:respuesta
        })
        
    })

    if(funciones.actualizarCurso(req.body.id)==false){
        res.render('verCursos',{
            err:"No se pudo actualizar "
        });
    }else{
        res.render('verCursos',{
            err:"Actualizado correctamente"
        });
    }
    */
})
app.get('/usuarios', (req, res) => {
    Usuario.find({}).exec((err, respuesta) => {
        if (err) {
            return console.log(err)
        }
        res.render('usuarios', {
            listado: respuesta
        })

    })
});
//////////////////////////inscritos
app.get('/inscritos', (req, res) => {
    console.log('********************');
    console.log(req.query.id);
    Matricula.find({}).exec((err, respuesta1) => {
        Usuario.find({}).exec((err, respuesta2) => {
            Curso.find({}).exec((err, respuesta3) => {
                if (err) {
                    return console.log(err)
                }
                res.render('inscritos', {
                    listado: respuesta1,
                    listadoU:respuesta2,
                    listadoC:respuesta3,
                    selec: req.query.id
                });
            });
        });
   });
});

app.get('/cursosInscritos', (req, res) => {
    Curso.find({}).exec((err, respuesta) => {
        if (err) {
            return console.log(err)
        }
        let lista = respuesta;

        res.render('cursosInscritos', {
            listado: respuesta
        })

    })
});

app.put('/actualizarUsuarios', (req, response) => {
    console.log(req.body, req.params)
    const { cc } = req.params;
    const { nombre, email, telefono_cel, tipo } = req.body;
    if (funciones.actualizarUsuarios(req.body) == false) {
        res.render('inscritos', {
            err: "no se pudo"
        });
    } else {
        res.render('inscritos', {
            usu: req.body.cc
        });
    }

    listU.forEach((usu) => {
        if (curso.cc == cc) {
            usu.nombre = nombre;
            usu.email = email;
            usu.telefono_cel = telefono_cel;
            usu.tipo = tipo;
        }
    });
    response.json('Successfully update');
});

mongoose.connect('mongodb://localhost:27017/cursos', { useNewUrlParser: true }, (err, res) => {
    if (err) {
        return console.log(err);
    }
    console.log('conectado');
});

console.log(__dirname);

app.listen(3000, () => {
    console.log('Puero 3000');
});

