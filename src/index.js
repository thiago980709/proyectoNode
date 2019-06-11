const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

//database
const cursos = [
    {
        id:1,
        name:'Java',
        description:'Java to start',
        cost:200,
        available:'no',
        modality:'Presencial',
        hours:2
    },
    {
        id:2,
        name:'phyton',
        description:'phyton to start',
        cost:200,
        available:'si',
        modality:'Presencial',
        hours:2
    },
    {
        id:3,
        name:'Php',
        description:'Php to start',
        cost:200,
        available:'si',
        modality:'Presencial',
        hours:2
    }
];


app.set('port', process.env.PORT || 3002);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Mostrar cursos coordinador
app.get('/cursos', (request,response)=>{
 response.json(cursos);
 console.log(request.body);
});

//Mostrar cursos interesado
app.get('/cursos/interesado', (request,response)=>{
    const {id,name,description,cost,available,modality,hours} = request.body;
    cursos.forEach(curso=>{
        if(curso.available ){
            response.json(curso);
            console.log(request.body);
        }
    })
    
   });

 //Mostrar datos de un curso en especifico
 app.get('/cursos/:id', (request, response) => {
    const {id,name,description,cost,modality,hours} = request.params;
    
    cursos.forEach((curso, i)=>{
        if(curso.id == id){
            response.json(curso);
        }
        
    })
    
});


//crear curso 
app.post('/cursos', (request, response)=>{
    const {id,name,description,cost,available,modality,hours} = request.body;
    cursos.forEach(curso => {
        if(curso.id === id){
            id=id+1
        }
    });
    cursos.push({
        id:cursos.length + 1,
        name:name,
        description:description,
        cost:cost,
        available:available,
        modality:modality,
        hours:hours
    });
    response.json('successfully created');
});

//Actualizar curso
app.put('/cursos/:id', (req, response) => {
    console.log(req.body, req.params)
    const { id } = req.params;
    const { name, description,cost,available, modality, hours} = req.body;

    cursos.forEach((curso) => {
        if(curso.id == id){
            curso.name = name;
            curso.description = description;
            curso.cost = cost;
            curso.available = available;
            curso.modality = modality;
            curso.hours = hours;
        }
    });
    response.json('Successfully update');
});

app.delete('/cursos/:id', (request, response) => {
    const {id} = request.params;

    cursos.forEach((curso, i)=>{
        if(curso.id == id){
            cursos.splice(i, 1)
        }
    })
    response.json('Successfully delete')
});



app.use(express.static(path.join(__dirname + '/public')));


app.listen(app.get('port'), ()=>{
    console.log(` Server on port ${app.get('port')}`);
});