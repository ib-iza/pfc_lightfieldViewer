var buttonGreek = document.getElementById("greek")
var buttonSideboard = document.getElementById("sideboard")
var buttonBike = document.getElementById("bike")
var buttonTarot = document.getElementById("tarot")

var files;
var size2;

buttonBike.onclick = function(){
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:3000/public/bikes');
    xhr.send();

    xhr.onload = async function() {
        files = await JSON.parse(xhr.response)
        var size = files.table[0].size
        size2 = size
        console.log(size)
        console.log(files.table)
        await loadRadios(size)
        //await createMatrix(size)
    };
};
buttonGreek.onclick = function(){
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:3000/public/greek');
    xhr.send();

    xhr.onload = async function() {
        files = await JSON.parse(xhr.response)
        console.log(files)
        var size = files.table[0].size
        size2 = size
        console.log(size)
        console.log(files.table)
        await loadRadios(size)
        //await createMatrix(size)
    };
};
buttonSideboard.onclick = function(){
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:3000/public/sideboard');
    xhr.send();

    xhr.onload = async function() {
        files = await JSON.parse(xhr.response)
        var size = files.table[0].size
        size2 = size
        console.log(size)
        console.log(files.table)
        await loadRadios(size)
        //await createMatrix(size)
    };
};
buttonTarot.onclick = function(){
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:3000/public/tarot');
    xhr.send();

    xhr.onload = async function() {
        files = await JSON.parse(xhr.response)
        var size = files.table[0].size
        size2 = size
        console.log(size)
        console.log(files.table)
        await loadRadios(size)
        //await createMatrix(size)
    };
};



let xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:3000/public');
xhr.send();

xhr.onload = async function() {
    files = JSON.parse(xhr.response)
    var size = files.table[0].size
    size2 = size
    console.log(size)
    console.log(files.table)
    await loadRadios(size)
    //await createMatrix(size)
};
var imgMatrix = []
var s
var t
async function createMatrix(size){
    var tempSize = size-1
    var img = []
    var j = 0;
    for(var i =0; i< tempSize; i++){
        if(i % Math.sqrt(tempSize) == 0 && i != 0){
            console.log(j)
            imgMatrix.push(img)
            console.log(imgMatrix)
            j++
            img = []
        }
        img.push(files.table[i+2].filename)
    }
    console.log("Valor da linha da matriz")
    console.log(imgMatrix)

}

function loadImage2(i){
    var index = parseInt(i) + 2
    console.log(index)
    console.log(files.table[index])
    document.getElementById("mainImage").src = files.table[index].filename;

    /*for(var i = 0; i < imgMatrix.length; i++ ){
        for(var j = 0; j< imgMatrix[0].length; j++){
            if(imgMatrix[i][j] == files.table[index].filename){
                s = i
                t = j
                console.log(s)
                console.log(t)
                break;
            }
        }
    }*/
}

document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented) {
        return;
      }
    if(event.code === "ArrowDown" || event.code === "ArrowUp" || event.code === "ArrowRight" || event.code === "ArrowLeft"){
        tentandoMudarEsseInferno(event.code)
    }
    event.preventDefault();
  }, true);


function tentandoMudarEsseInferno(code){
    var radios = document.querySelectorAll('input[type=radio][name="myRadio"]');
    let selectedSize;
    var hascheck = false
    var n = Math.sqrt(size2)
    for (const radioButton of radios) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            radioButton.checked = false;
            hascheck = true
            break;
        }
    }
    if(hascheck){
        var n = Math.sqrt(size2)
        if(code === "ArrowDown"){
            radios[parseInt(selectedSize)+n].checked = true
            loadImage2(parseInt(selectedSize)+n)
        }else if(code === "ArrowUp"){
            radios[parseInt(selectedSize)-n].checked = true
            loadImage2(parseInt(selectedSize)-n)
        }else if(code === "ArrowRight"){
            radios[parseInt(selectedSize)+1].checked = true
            loadImage2(parseInt(selectedSize)+1)
        }else if(code === "ArrowLeft"){
            radios[parseInt(selectedSize)-1].checked = true
            loadImage2(parseInt(selectedSize)-1)
        }
    }
}

async function loadRadios(size){
    var n = Math.sqrt(size)
    console.log(n)
    for(var i = 0; i< size; i++){
        var radiobox = document.createElement('input');
        radiobox.type = 'radio';
        radiobox.name = "myRadio";
        radiobox.value = i;
        if(i != 0 && i%n == 0){
            var newline = document.createElement('br');
            container.appendChild(newline);
        }
        container.appendChild(radiobox);       
    }
    var radios = document.querySelectorAll('input[type=radio][name="myRadio"]');
    Array.prototype.forEach.call(radios, function(radio) {
        radio.addEventListener('change', changeHandler);
    });
}

function changeHandler(event) {
    console.log(this.value);
    loadImage2(this.value)            
}

/*var imgok = new Image();
imgok.src = document.getElementById("mainImage").src
const canvas = document.createElement('canvas'); 
const ctx = canvas.getContext('2d'); 
 
canvas.width = imgok.width; 
console.log(canvas.width);
canvas.height = imgok.height; 
console.log(canvas.height);
 
ctx.drawImage(imgok, 0, 0); 
 
const imgData = ctx.getImageData( 
  0, 0, imgok.width, imgok.height 
).data; 
console.log(imgData.length);

var matrizPixels = []
var j = 0
for(var i = 0; i< imgData.length-3; i=i+4){
    var pixel = [imgData[i], imgData[i+1], imgData[i+2], imgData[i+3]]
    
    matrizPixels[j] = []
    matrizPixels[j].push(pixel)
}
console.log(matrizPixels[0][0])
*/

/*function refocus(){
    var Srefocus = s - 0.4
    var Trefocus = t - 0.4
    var sumS = 0;
    var sumT = 0;
    var disp = 0.3
    for(var i = 0; i< imgMatrix.length; i++){
        sumS = sumS + (i - Srefocus)
    }
    for(var j = 0; j< imgMatrix[0].length; j++){
        sumT = sumT + (j - Trefocus)
    }
    var valueS = sumS*disp
    var valueT = sumT*disp
    for(var i = 0; i< imgData.length; i++){
        imgData
    }
}*/