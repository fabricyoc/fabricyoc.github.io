var agora = new Date();
// var hora = agora.getHours();
var hora = 23

if (hora >= 1 && hora <= 5 ) {
    console.log('Boa madrugada');
} else if (hora < 12 && hora > 5) {
    console.log('Bom dia');
} else if (hora >= 12 && hora <= 18) {
    console.log('Boa Tarde');
} else if (hora == 0 || hora <= 23 ) {
    console.log('Boa Noite');
}