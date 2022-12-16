console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  fetchAndRenderKoalas();
$('#addButton').on('click',createKoala);
$('body').on('click', '#deleteButton', deleteKoala);
// $('body').on('click', '.swal-button--confirm',deleteKoala)
$('body').on('click', '#readyButton', switchKoalaTOReady);
$('body').on('click', '#notReadyButton', switchKoalaFromReady);
}); 


function fetchAndRenderKoalas(){
  console.log( 'in getKoalas' );
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then((dbResponse) => {
    $('#viewKoalas').empty();
    for (let koala of dbResponse) {
      if (koala.ready_to_transfer == 'Y'){
        $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td>
            <button type="button" id="notReadyButton">Go Back!!!!</button>
          </td>
          <td>
            <button type="button" id="deleteButton">Delete</button>
          </td>
        </tr>
        `)
      } else if (koala.ready_to_transfer == 'N') {
        $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td>
            <button type="button" id="readyButton">Ready TO transfer</button>
          </td>
          <td>
            <button type="button" id="deleteButton">Delete</button>
          </td>
        </tr>
      `)
      }
    }
  }).catch((dbErr) => {
    console.log('Error in getKoalas response: ', dbErr);
  })
}

function createKoala () {
  let koalaName = $('#nameIn').val();
  let koalaAge = $('#ageIn').val();
  let koalaGender = $('#genderIn').val();
  let koalaReady = $('#readyToTransferIn').val();
  let koalaNotes = $('#notesIn').val();

  let newKoala = {
    name:koalaName,
    age:koalaAge,
    gender:koalaGender,
    ready_to_transfer: koalaReady,
    notes: koalaNotes
  }

  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
  }).then((response)=>{
    console.log('response from server', response);
    fetchAndRenderKoalas();
  }).catch((response)=>{
    console.log('error in post', response)
  });

  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyToTransferIn').val('');
  $('#notesIn').val('');
}

function switchKoalaTOReady () {
  let idToUpdate = $(this).parent().parent().data().id
  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      ready_to_transfer: 'Y'
    }
  }).then((response)=>{
    fetchAndRenderKoalas();
  }).catch((response)=>{
    console.log('Error in PUT /koalas: ', response);
  })
}

function switchKoalaFromReady () {
  let idToUpdate = $(this).parent().parent().data().id
  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      ready_to_transfer: 'N'
    }
  }).then((response)=>{
    fetchAndRenderKoalas();
  }).catch((response)=>{
    console.log('Error in PUT /koalas: ', response);
  })
}
// function deleteWarning () {
//   swal("Are you sure?", {
//     dangerMode: true,
//     buttons: true,
//   })
  // .then((result)=> {
  //   if (result === true){
  //     deleteKoala();
  //   }
  // })
  // }

function deleteKoala () {
  let idToDelete = $(this).parent().parent().data().id;
  swal("Are you sure?", {
    title: "Delete Koala",
    icon: "warning",
    dangerMode: true,
    buttons: true,
  }).then((response) => {
    if (response === true){
      $.ajax({
        method: 'DELETE',
        url: `/koalas/${idToDelete}`
      }).then((response) => {
        fetchAndRenderKoalas ();
      }).catch((error) => {
        console.log('delete koalas is broke',error);
      })
    }
  })

}
