//primeira pantalla -> instruccions, Taboleiro de xogo, marcador, regras.
//Base de datos para gardar usuarios e puntuacions, o arrancar a aplicación propoñemos rexistrarse ou continuar co usuario creado anteriormente
//O xogo vai constar de 3 niveles
//A puntuacion de cada nivel dependerá do tempo empregado en resolver o cebracabezas


//Pantalla de xogo
//Mostramos tempo(en conta regresiva), nivel, e número de acertos.
//Mostranse as imaxes das parellas durante unha conta regresiva e a continuación comeza o xogo coas cartas dadas a volta
//Cando o usuario clicka por primeira vez, gardamos o id da foto, en caso de que o seguinte click coincida co id da foto anterior volteamos as duas fotos
//e engadimos un acerto o contador.
//Si se consigue voltear todas as parellas antes de que se acabe o tempo pasase o nivel seguinte.
//Vaise gardando a puntuación do usuario hasta que perda, en caso de perder comparase a cantidade de puntos totales acumulados cos gardados na base de
//datos e si e superior, modificase o rexistro po la nova puntuación superior.



/*
Dependendo do nivel de xogo utilizase o array niveis para definir filas e columnas de imaxes
O tamaño das imaxes definimolo segun o nivel tamén, pasamola en un array chamado clasesImagenes
*/
var finNivel = false;
var nivelActual = 0;
var texto = '';
var acertos = 0;
var intentos = 0;
var puntuacion = 0;
function pantallaJuego(){
        //creamos el array de imagenes.
        //tenemos que introducir parejas de números
        let tamanhoVector = niveis[nivelActual] * niveis[nivelActual];
        //tamanhoVector = tamanhoVector-1;
        imgVector = Array(tamanhoVector);
        // En esta parte del codigo tratamos de repartir las fotos en el array, de manera que tengamos dos de
        //cada una, para jugar con las parejas.
        for (let i = 0; i < nImgNivel[nivelActual]; i++) {
          imgVector[i] = codImg[i];
          imgVector[tamanhoVector - i] = codImg[i];
      }
      


        //barajamos el array
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
          shuffle(imgVector);


        
        //los condicionales los hacemos para poder sacar las imagenes correspondientes del array, sin ellos, al tener
        //dos bucles solo sacabamos las 3 primeras del vector en cada entrada al bucle secundario.
        texto = '';
        texto2 = '<table>';
        texto='<div id="xogo">'+
        '<div id="marcadorXogo"><ul><li>Nivel:<br>' + nivelActual + '</li><li>Acertos:<p>' + acertos + '</p></li><ul></div>' +
        '<div id="imaxes"><table>';
        for (let i = 0; i < niveis[nivelActual]; i++) {
            texto+='<tr>'
            texto2+='<tr>';
            for (let j = 0; j < niveis[nivelActual]; j++) {
              if(i==0){
              texto2+= '<td name="'+imgVector[j]+'"><img class="' + clasesImagenes[nivelActual] + '" src="../img/silueta.png"></td>'; 
              texto+='<td><img class="' + clasesImagenes[nivelActual] + '" src="../img/'+imgVector[j]+'.jpeg"></td>'; 
            }else{
              texto2+= '<td name="'+imgVector[j+(niveis[nivelActual]*i)]+'"><img class="' + clasesImagenes[nivelActual] + '" src="../img/silueta.png"></td>'; 
              texto+='<td><img class="' + clasesImagenes[nivelActual] + '" src="../img/'+imgVector[j+niveis[nivelActual]*i ]+'.jpeg"></td>';
            }
            }
            texto+='</tr>';
            texto2+='</tr>';
        }
        
    texto+='</table></div><div>';
    texto2+='</table></div><div>';
    


    taboleiro.innerHTML = texto;
    //mostrar estas imagenes durante 5seg luego darles la vuelta;  
    function countdownFinished() {
        $('#imaxes').html(texto2);
      }
    
    let count = tiempoVerCartas[nivelActual];
    for (var i = count; i >= 0; i--) {
      (function(i) {
        setTimeout(function() {
          if (i === 0) {
            countdownFinished();
          }
        }, (count - i) * 1000);
      })(i);
    }
    
//comprobamos que el usuario no pueda descubrir clickando dos veces en la misma imagen.
//comprobamos que la imagenes sean iguales con el atributo name, tienen que ser iguales.
//Comprobamos con el "undefined" que si es el primer click el programa almacene el primero para compararlo con el segundo
//Damos la vuelta a las dos imagenes cuando el usuario acierta.

//FALTA:
//Listo -> Debemos tener un contador de aciertos que se va actualizando a medida que el usuario acierta.
let previousTd;
$(document).on("click", "td", function() {

  //facemos unha conta atras do tempo que ten o usuario para acertar as parexas, en caso de esgotarse o tempo salimos do xogo
  //mostramoslle unha mensaxe e un boton para volver o menu principal
  function countdownFinished() {
    console.log('entra');
    $('#taboleiro').html("<h1>Tempo esgotado</h1><button id='volverAlMenu' type='submit'>MenuPrincipal</button>");
  }


let count = tiempoJuego[nivelActual];
for (var i = count; i >= 0; i--) {
  (function(i) {
    setTimeout(function() {
      if(finNivel == true){
        return;
      }
      console.log(i);
      if (i === 0) {
        countdownFinished();
      }
    }, (count - i) * 1000);
  })(i);
}

  if (typeof previousTd !== "undefined" && previousTd.attr("name") === $(this).attr("name") && previousTd[0] !== this) {
    $(this).html('<img class="' + clasesImagenes[nivelActual] + '" src="../img/'+$(this).attr("name")+'.jpeg">');
    previousTd.html('<img class="' + clasesImagenes[nivelActual] + '" src="../img/'+$(this).attr("name")+'.jpeg">');
    acertos++;
    //cada vez que produce un acierto sumamos el acierto a la variable y actualizamos el número de aceirtos
    $('#marcadorXogo li:eq(1) p').text(acertos);
    //Comprobamos si ha acertado todas, en ese caso calculamos la puntuación del usuario, le mostramos un mensaje por pantalla de fin de nivel
    // y pasamos al siguiente nivel.
    if(acertos == nAcertos[nivelActual]){
      puntuacion = (acertos *100) / intentos;
      alert('Fin do nivel');
      finNivel = true;
      acertos = 0;
      intentos = 0;
      console.log(puntuacion);
      nivelActual++;
      pantallaJuego();
    }
  }
  intentos++;
  previousTd = $(this);
});
//funcion del boton para volver al menu principal 
$(document).on("click","#volverAlMenu",function () {
  $(location).attr('href','../menu.html');
});

}

function mostrarReglas(){
  $(document).on("click","#volverAlMenu",function () {
    $(location).attr('href','../menu.html');
  });
}
