const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const dirNode_modules = path.join(__dirname , '../node_modules')
const funciones = require('./funciones');



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
    
    if(funciones.crear(req.body) == false){
        res.render('registro',{
            err:"Este estudiante ya esta registrado"
        });
    }else{
        res.render('indexU',{
            est:req.body.nombre
        });
    }
    
});

app.post('/curso',(req,res)=>{
    if(funciones.crearCurso(req.body)==false){
        res.render('crearCurso',{
            err:"Este curso ya existe!"
        });
    }else{
        res.render('crearCurso',{
            err:"Curso registrado con exito"
        });
    }
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
    res.render('verCursos');
    
});
app.get('/verCursosI',(req, res)=>{
    res.render('verCursosI');
    
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
});
console.log(__dirname);

app.listen(3000,()=>{
    console.log('Puero 3000');
});

