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
                                 <input type = "text"  class = "available" value = "${curso.available}"/>
                             </td>
                             <td>
                             <input type = "text"  class = "modality" value = "${curso.modality}"/>
                         </td>
                         <td>
                             <input type = "text"  class = "hours" value = "${curso.hours}"/>
                         </td>
                             <td>
                                 <button class="update-button">Actualizar</button>
                                
                             </td>
                             <td>
                             <button class="delete-button">Eliminar</button>
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
                 available:'si',
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
         let available = row.find('.available').val();
         let modality = row.find('.modality').val();
         let hours = row.find('.hours').val();
         $.ajax({
           url: `/cursos/${id}`,
           method: 'PUT',
           data:{
             name:name,
             description:description,
             cost:cost,
             available:available,
             modality:modality,
             hours:hours
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
                  if(curso.available == 'si'){
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
                            <button class="info">Más info</button>
                        </td>
                        <Br>
                       
                    </tr>
                `)
                  }
                    
                 })
             }
        });
    });

  
     $('table').on('click', '.info', function(){
        let row = $(this).closest('tr');
        let idE =row.find('.id').text();

        $.ajax({
            url: `/cursos/${idE}`,
            method: 'GET',
            success: function(response){
                alert(`El curso ${response.name} con modalidad ${response.modality} e intensidadad horaria de ${response.hours} horas: ${response.description}. `);
                
            }
        });
    });
   
});