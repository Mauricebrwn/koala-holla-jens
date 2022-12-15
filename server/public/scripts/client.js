console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  //setupClickListeners()
  // load existing koalas on page load
  fetchAndRenderKoalas();
$('#addButton').on('click',createKoala);
$('body').on('click', '#readyButton', switchKoalaTOReady);
}); // end doc ready

// function setupClickListeners() {
//   $( '#addButton' ).on( 'click', function(){
//     console.log( 'in addButton on click' );
//     // get user input and put in an object
//     // NOT WORKING YET :(
//     // using a test object
//     let koalaToSend = {
//       name: 'testName',
//       age: 'testName',
//       gender: 'testName',
//       readyForTransfer: 'testName',
//       notes: 'testName',
//     };
//     // call saveKoala with the new obejct
//     saveKoala( koalaToSend );
//   }); 
// }

function fetchAndRenderKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then((dbResponse) => {
    $('#viewKoalas').empty();
    for (let koala of dbResponse) {
      $('#viewKoalas').append(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td>
            <button type="button" id="readyButton">Ready TO transfer</button>
          </td>
        </tr>
      `)
    }
  }).catch((dbErr) => {
    console.log('Error in getKoalas response: ', dbErr);
  })
  
} // end getKoalas

function createKoala (koalaToAdd) {
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
}

function switchKoalaTOReady

// function saveKoala( newKoala ){
//   console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
//}
