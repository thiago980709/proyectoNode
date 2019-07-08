require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const dirNode_modules = path.join(__dirname , '../node_modules')
const funciones = require('./funciones');

const mongoose = require('mongoose');
const Curso = require('./../src/models/cursos');
const Usuario = require('./../src/models/usuarios');

const directoriopublico = path.join(__dirname,'../public');
const directoriopartials = path.join(__dirname,'../partials');
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}));
//Bootstrap
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
app.set('view engine' , 'hbs');



app.get('/',(req, res)=>{
    res.render('index');
});

app.get('/crearCurso',(req, res)=>{
    res.render('crearCurso',{
        est: req.body.nombre
    });
});
app.get('/login',(req, res)=>{
    res.render('login');
});
app.get('/inscribir',(req, res)=>{
    res.render('crearCurso');
});
app.get('/registro',(req, res)=>{
    res.render('registro');
});
app.post('/indexU',(req, res)=>{
    
    let usuario = new Usuario({
        nombre:req.body.nombre,
        documento:req.body.documento,
        email:req.body.email,
        telefono_cel:req.body.telefono_cel,
        tipo:'a'
    }) 
    //console.log(req.body);
    usuario.save((err,resultado)=>{
       if(err){
        res.render('indexU', {
            err:err
        })
       }
       res.render('indexU',{
        err:resultado
    })
})
    
});

app.post('/curso',(req,res)=>{
    let curso = new Curso({
        id:req.body.newId,
        nombre:req.body.newNombre,
        des:req.body.newDescripcion,
        valor:req.body.newValor,
        modalidad:req.body.newModalidad,
        horas:req.body.newHoras,
        estado:'disponible'
    }) 
    console.log(req.body);
    curso.save((err,resultado)=>{
       if(err){
        res.render('crearCurso', {
            err:err
        })
       }
       res.render('crearCurso',{
        err:resultado
       })
    })
})
app.post('/in',(req,res)=>{
    console.log(req.body);
    if(req.body.documento == 123456){
        res.render('indexC',{
            est: req.body.nombre
        });
    }else{
        res.render('indexU',{
            est: req.body.nombre
        });
    }
    
});

app.get('/verCursos',(req, res)=>{
    Curso.find({}).exec((err, respuesta)=>{
        if(err){
            return console.log(err)
        }
        let lista= respuesta;

        res.render('verCursos', {
            listado:respuesta
        })
   
        
    })
    
});
app.get('/verCursosI',(req, res)=>{
    Curso.find({}).exec((err, respuesta)=>{
        if(err){
            return console.log(err)
        }
        let lista= respuesta;

        res.render('verCursosI', {
            listado:respuesta
        })
        
    })
    
});

app.post('/eliminar', (req, res) => {
    if(funciones.eliminarCurso(req.body.id) == false){
        console.log(req.body.id);
        res.render('verCursos',{
            
            err:'No se eliminó'
        } );
    }else{
        res.render('verCursos',{
            
            err:' se eliminó'
            
        } );
    }
});

app.post('/informacion', (req, res) => {
    console.log(req.body.id);
    funciones.informacion(req.body.id);
    Curso.find({}).exec((err, respuesta)=>{
        if(err){
            return console.log(err)
        }
        //console.log(res);
        let lista= respuesta;
       
        res.render('verCursosI', {
            listado:respuesta
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

app.post('/actualizarCurso',(req,res)=>{
    
    Curso.findOneAndUpdate({id : req.body.id},req.body,{new:true, useFindAndModify: false},(err, resultado)=>{
       console.log(resultado);
        if(err){
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
app.get('/actualizarCurso',(req,res)=>{
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

//////////////////////////inscritos
app.get('/inscritos',(req, res)=>{
    Usuario.find({}).exec((err, respuesta)=>{
        if(err){
            return console.log(err)
        }
        res.render('inscritos', {
            listadoU:respuesta
        })
    })
    
});

app.put('/actualizarUsuarios', (req, response) => {
    console.log(req.body, req.params)
    const { cc } = req.params;
    const { nombre, email,telefono_cel, tipo } = req.body;
    if(funciones.actualizarUsuarios(req.body) == false){
        res.render('inscritos',{
            err:"no se pudo"
        });
    }else{
        res.render('inscritos',{
            usu:req.body.cc
        });
    }

    listU.forEach((usu) => {
        if(curso.cc == cc){
            usu.nombre = nombre;
            usu.email = email;
            usu.telefono_cel = telefono_cel;
            usu.tipo = tipo;
        }
    });
    response.json('Successfully update');
});

mongoose.connect('mongodb://localhost:27017/cursos', {useNewUrlParser: true}, (err, res)=>{
    if(err){
        return console.log(err);
    }
    console.log('conectado');
});

console.log(__dirname);

app.listen(3000,()=>{
    console.log('Puero 3000');
});

