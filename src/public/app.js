$(function () {
    $('#getCursos').on('click', function () {
        $.ajax({
            url: '/cursos',
            success: function(cursos) {
              let tbody = $('#coordinador');
              tbody.html('');
              cursos.forEach(curso => {
                     tbody.append(`
                         <tr>
                             <td class ="id">${curso.id}</td>
                             <td>
                                 <input type = "text"  class = "name" value = "${curso.name}"/>
                             </td>
                             <td>
                                 <input type = "text"  class = "description" value = "${curso.description}"/>
                             </td>
                             <td>
                                 <input type = "text"  class = "cost" value = "${curso.cost}"/>
                             </td>
                             <td>
                                 <input type = "text"  class = "cost" value = "${curso.available}"/>
                             </td>
                             <td>
                             <input type = "text"  class = "modality" value = "${curso.modality}"/>
                         </td>
                         <td>
                             <input type = "text"  class = "hours" value = "${curso.hours}"/>
                         </td>
                             <td>
                                 <button class="update-button">Update</button>
                                
                             </td>
                             <td>
                             <button class="delete-button">Delete</button>
                             </td>
                         </tr>
                     `)
                 })
             }
        });
    });
 
    $('#cursoForm').on('submit', function(e) {
        e.preventDefault();
         let newNombre = $('#newNombre');
         let newDescripcion = $('#newDescripcion');
         let newValor = $('#newValor');
         let newModalidad = $('#newModalidad');
         let newHoras = $('#newHoras');
         $.ajax({
             url: '/cursos',
             method: 'POST',
             data:{
                 name: newNombre.val(),
                 description: newDescripcion.val(),
                 cost: newValor.val(),
                 available:true,
                 modality: newModalidad.val(),
                 hours: newHoras.val(),
                 
                 
             },
             success: function(response) {
               
                 $('#getCursos').click();
             
             }
         });
             
     });
 
     $('table').on('click', '.update-button', function() {
         let row = $(this).closest('tr');
         let id = row.find('.id').text();
         let name = row.find('.name').val();
         let description = row.find('.description').val();
         let cost = row.find('.cost').val();
         console.log(name);
         $.ajax({
           url: `/cursos/${id}`,
           method: 'PUT',
           data:{
             name:name,
             description:description,
             cost:cost
           },
           success: function(response) {
             console.log(response);
             console.log('ops')
             $('#getCursos').click();
           }
         });
       });
 
     $('table').on('click', '.delete-button', function(){
         let row = $(this).closest('tr');
         let id =row.find('.id').text();
         $.ajax({
             url: `/cursos/${id}`,
             method: 'DELETE',
             success: function(response){
                 $('#getCursos').click();
             }
         });
     });
    
 });

 $(function () {
    $('#getCursosInter').on('click', function () {
        $.ajax({
            url: '/cursos',
            success: function(cursos) {
              let tbody = $('#interesado');
              tbody.html('');
              cursos.forEach(curso => {
                  if(curso.available == true){
                    tbody.append(`
                    <tr>
                        <td class ="id">${curso.id}</td>
                        <td>
                            <text  class = "name" >${curso.name}: <text/>
                        </td>
                        <Br>
                        <td>
                           <text  class = "description" >${curso.description}<text/>
                        </td>
                        <Br>
                        <td>
                           <text  class = "cost" >Precio:  ${curso.cost}<text/>
                        </td>
                        <td>
                            <button>Más info</button>
                        </td>
                        <Br>
                       
                    </tr>
                `)
                  }
                    
                 })
             }
        });
    });

    $('#getEstudiantes').on('click', function () {
        $.ajax({
            url: '/estudiantes',
            success: function(estudiantes) {
              let tbody = $('#estudiantes');
              tbody.html('');
              estudiantes.forEach(estudiante => {
                     tbody.append(`
                         <tr>
                             <td class ="id">${estudiante.idE}</td>
                             <td>
                                 <input type = "text"  class = "nameE" value = "${estudiante.nameE}"/>
                             </td>
                             <td>
                                 <input type = "text"  class = "correoE" value = "${estudiante.correoE}"/>
                             </td>
                             <td>
                                 <input type = "text"  class = "telE" value = "${estudiante.telE}"/>
                             </td>
                             <td>
                                 <button class="update-button">Update</button>
                                
                             </td>
                             <td>
                             <button class="delete-button2">Delete</button>
                             </td>
                         </tr>
                     `)
                 })
             }
        });
    });

    $('#inscripcionForm').on('submit', function(e) {
        e.preventDefault();
         let nameE = $('#newNombre');
         let correoE = $('#newDescripcion');
         let telE = $('#newValor');
         $.ajax({
             url: '/estudiantes',
             method: 'POST',
             data:{
                 nameE:nameE.val(),
                 correoE:correoE.val(),
                 telE:telE.val()
                 
             },
             success: function(response) {
               
                 $('#getEstudiantes').click();
                console.log(estudiantes);
             }
         });
             
     });

     $('table').on('click', '.class="update-button"', function(){
        let row = $(this).closest('tr');
        let idE =row.find('.idE').text();
        $.ajax({
            url: `/cursos/${idE}`,
            method: 'GET',
            success: function(response){
                alert(`${idE}`);
            }
        });
    });
   
});