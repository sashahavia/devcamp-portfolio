// Change font size in one of the <div>s
var fontChanged = false;

function changeFont() {
  if (fontChanged == false){
    // console.log("False ");
    document.getElementById("text").style.fontSize = "20px";
    fontChanged = true;
  } else if (fontChanged == true) {
    // console.log("True ");
    document.getElementById("text").style.fontSize = "1rem";
    fontChanged = false;
  } 
}

// select only one checkbox at a time
$('.form-check-input').on('change', function() {
  $('.form-check-input').not(this).prop('checked', false);  
});


// Change background color
function changeColor() {
  var checkedValue = null; 
  var inputElements = document.getElementsByClassName('form-check-input');
  for(var i = 0; inputElements[i]; i++){
    if(inputElements[i].checked){
      checkedValue = inputElements[i].value;
      break;
    }
  }
  changeBackground(checkedValue); 
}

function changeBackground(value){
  if (value == 1) {
    document.getElementById('welcome').style.background = 'rgba(255, 0, 0, 0.2)';
  } else if (value == 2) {
    document.getElementById('welcome').style.background = 'rgba(0, 0, 255, 0.2)';
  } else if (value == 3) {
    document.getElementById('welcome').style.background = 'rgba(0, 255, 0, 0.2)';
  } else if (value == 4) {
    document.getElementById('welcome').style.background = 'rgba(255, 255, 255, 1.0)';
  } else {
    document.getElementById('error').innerHTML = "Nothing was selected";
  }
}

// Check if passwords match
var check = function() {
  if (document.getElementById('password').value ==
    document.getElementById('password-confirm').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
  }
}

// Range slider
var slider = document.getElementById("range");
var output = document.getElementById("range-value");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

// input text convert to uppercase
$(function() {
  $('.title').keyup(function() {
      this.value = this.value.toUpperCase();
  });
});

// count how many words the user entered
$(document).ready(function() {
  $("#description").on('keyup', function() {
    var words = this.value.match(/\S+/g).length;
    if (words > 100) {
      // Split the string on first 100 words and rejoin on spaces
      var trimmed = $(this).val().split(/\s+/, 100).join(" ");
      // Add a space at the end to make sure more typing creates new words
      $(this).val(trimmed + " ");
    } else {
      $('#display_count').text(words);
      $('#word_left').text(100-words);
    }
  });
});

//  Submit form

var email = undefined;
var date = undefined;
var tel = undefined;
var number = undefined;
var range = undefined;

$('form').submit(function (e) {
   e.preventDefault(); //prevents the default action
});

function myFunction() {
  var $myApplication = $('#myForm');
  if($myApplication[0].checkValidity()) {
    // reading user's input
    email = document.getElementById("email").value;
    date = document.getElementById("date").value;
    number = document.getElementById("number").value;
    range = document.getElementById("range").value;
    console.log(email + " " + date + " " + number + " " + range);

    document.getElementById("form-result").style.display = "block";
    document.getElementById("myForm").style.display = "none";
  }
}

// Contact us form
function contactUs() {
  var $myForm = $('#contact-form');
  if($myForm[0].checkValidity()) {
    tel = document.getElementById("form_phone").value;
    console.log(tel);
    storeValue(tel);
    document.getElementById("contact-result").style.display = "block";
    document.getElementById("contact-page").style.display = "none";
  } 
}

function storeValue(tel) {
  if(typeof(Storage) !== "undefined"){
    // Store data
    console.log("Session storage" + tel);
    sessionStorage.setItem("phone", tel);
    // Retrieve data
    document.getElementById("storage").innerHTML = sessionStorage.getItem("phone");
  } else{
    document.getElementById("storage").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}
//  Geolocation parameters     
function initCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initialize, handle_error);
  } else {
    document.getElementById("map-frame").style.display = "block";
    showError("Your browser does not support Geolocation!"); 
  }
}

// handle error if user denied location, show regular map
function handle_error(err) {
  if (err.code == 1) {
    document.getElementById("map-frame").style.display = "block";
  }
}

function initialize(position) {
  lat = position.coords.latitude;        
  lon = position.coords.longitude; 
  loadScript();
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDNiVDpRV23ik8dGMfpVaG-kUEm6JQP7aw&callback=initMap";
  document.body.appendChild(script);
}

function initMap() {
  console.log("Latitude: "+lat+"\nLongitude: "+lon);
  var myLatlng = new google.maps.LatLng(lat, lon);
  var myOptions = {
    zoom: 15,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById("map"), myOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"You are here"
  });

  // To add the marker to the map, call setMap();
  marker.setMap(map);
}




