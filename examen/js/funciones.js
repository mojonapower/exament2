//var wsUrl = "http://url.dominio/server.php?wsdl";//para probar de afuera.
function singleSelectChangeText() {
  //Getting Value

  var selObj = document.getElementById("selector");
  var selValue = selObj.options[selObj.selectedIndex].text;
  
  //Setting Value
  return(selValue)
}
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
document.addEventListener("deviceready", onDeviceReady, false);

function showAlert(msj)
{
    navigator.notification.alert(
        msj,  // message
        'UNAB',   // title
        ''    // buttonName
    );
}//fin function mensaje.

// PhoneGap is ready
    function onDeviceReady() 
    {
		// Do cool things here...
		document.getElementById('largeImage').src='';
		clearCache();
		pictureSource=navigator.camera.PictureSourceType;
		destinationType=navigator.camera.DestinationType;
    }
    function clearCache() 
    {
		navigator.camera.cleanup();
	}
 
	function getImage(source) 
	{
	    // Retrieve image file location from specified source
		navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
    destinationType: Camera.DestinationType.DATA_URL, sourceType: source});	//destinationType: navigator.camera.DestinationType.FILE_URI
	 
    }
    
    function onFail(message) {
    
    clearCache();
		//alert('Captura Descartada.');
		showAlert('Captura Descartada.'+ message);
			
}
 
    function uploadPhoto(imageURI) 
    {
	  var largeImage = document.getElementById('largeImage');
	    largeImage.style.display = 'block';
	    largeImage.src ="data:image/jpeg;base64," + imageURI;
	    
    }
    
   
function enviaFoto()
{
  var nombres=document.getElementById('nombres').value;
  var RutAlumno=document.getElementById('RutAlumno').value;
  var apellidos=document.getElementById('apellidos').value;
  var edad=document.getElementById('edad').value;
  var email=document.getElementById('email').value;
  var fono=document.getElementById('fono').value;
  var carrera=document.getElementById('carrera').value;
	//var foto=document.getElementById('largeImage');
  var fotoSrc=document.getElementById('largeImage').src;
  var d = new Date();
  var dia = d.getDate();
  var mes= d.getMonth();
  var anio=d.getYear();
  var hora =d.getUTCHours()
  hora=hora+8
  var minuto =d.getUTCMinutes()
  anio =anio-100+2000;
  mes =mes+1
  //FECHA, ENVIAR AL SERVICIO
  var fecha= (dia + "/"+mes +"/"+ anio+"a las "+hora+":"+minuto);
  //DROPDOWN MENU https://codepen.io/mojonapower/

  var op=singleSelectChangeText()
  
	
	if(op ='' ||nombres=='' || fotoSrc=='' || RutAlumno=='' || apellidos=='' || edad=='' || email=='' ||fono==''||carrera=='')
	{
		showAlert('Debe Ingresar TODOS los valores!');
	}
	else
	{
	  //var fotoCod=encodeImageFileAsURL(foto);

            $.ajax({
            cache: false,
            // puede ser GET, POST
            type: "POST",  							
            // Tipo de retorno
            dataType: "html",
            // pagina php que recibe la llamada
            url: "http://72.14.183.67/ws/examen/perfil.php",  							
            // datos, ej: $_POST['data']
            data: {
                    foto:fotoSrc,
                    nombres:nombres,
                    apellidos:apellidos,
                    rut:RutAlumno,
                    edad:edad,
                    sexo:op,
                    email: email,
                    fono:fono,
                    carrera:carrera,
                    coordenadas:'1,1',
                    fecha_creacion:fecha,

                    				
            },
            /*beforeSend: function(){  
                document.getElementById('divCargando').style.display="block";
                $("#labelCargando").html('Cargando...');	
            },*/
            // acciones cuando me retorna algo el PHP
            success: function( msg){
                   console.log(msg);
		   var data= $.parseJSON(msg);
                    if(data.code==0)
                    {
                        showAlert(data.msg+'Foto Subida!--> http://72.14.183.67/ws/examen/archivos/'+RutAlumno+'.html');
                    }
                    else if(data.code==1)
                    {
			showAlert(data.msg+'Ha ocurrido un Error. Archivo ya existe!');  
		      

                    }
                    else
		    {
		      showAlert(data.code+'data.code !=0 , pero la foto se subió igual :DD --> http://72.14.183.67/ws/examen/archivos/'+RutAlumno+'.html');  
		    }
            },							
            // acciones cuando hay error en comunicacion el el php
            error: function(xhr, status,msg2 ){
                    //alert('4');			
                    console.log(xhr);
            }
            });//fin ajax
	
        }
}
