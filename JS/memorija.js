var pictures = [
    {
        ime:'lav',
        img:'./style/assets/pictures/lav.jpg',
        
    },
    {
        ime:'orao',
        img:'./style/assets/pictures/orao.jpg',
    },
    {
        ime:'bubamara',
        img:'./style/assets/pictures/bubamara.jpg',
        
    },
    {
        ime:'konj', 
        img:'./style/assets/pictures/konj.jpg',
    },
    {
        ime:'delfini',
        img:'./style/assets/pictures/delfini.jpg',
    },
    {
        ime:'flamingo',
        img:'./style/assets/pictures/flamingo.jpg',
    },
    {
        ime:'panda',
        img:'./style/assets/pictures/panda.jpg',
    },
    {
        ime:'maca',
        img: './style/assets/pictures/maca.jpg' ,
    }
];

var allPictures = pictures.concat(pictures);
var numClick = 0;
var time;
var int;
var clicked;

window.onload = function() {
    mixPic();
    setPic();
    $('.img').hide();

    $('#start').on("click", function(){
        var duration = changeTime();
        var timer = duration;

        //kada prodje 1000ms(1s) ona se okida i ona je beskonacna
        //setTimeOut se okida samo jednom
        int = setInterval(function() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            formatTimer(minutes, seconds);
            // -- odmah smanji vrednost; i radi dok ne dodje do 0
            if (--timer < 0) {
                timer = duration;
            }
            
            if (minutes === 0 && seconds === 0) {
                alert('IGRA JE ZAVRŠENA');
                clearInterval(int);
            }
            
            if($('.win').length === allPictures.length){
                alert('POBEDILI STE!');
                clearInterval(int);
            }
        }, 1000);
    })

    //on.("click", fun) moze da broji klikove dok u vanilla js ne moze to sa event listener-ima
    $('.pictures-back').on("click", function(){
        //mora se pristupiti roditelju (klasi slike) da bi mi vratio decu (slika) 
        if(!int){
            return;
        }
        var img = $(this).children()[0];
        $(img).show();

        if(!clicked){
            clicked = img;
        } 

        numClick++;
        
        //u zavisnosti da li su slike iste ili ralicite ostavljamo ih ili sklanjamo
        if(numClick===2){
            if($(img).attr("value") === $(clicked).attr("value")){
                $(img).show().addClass('win');
                $(clicked).show().addClass('win');
            }else{
                $(clicked).fadeOut(1000);
                $(img).fadeOut(1000);
            }

            numClick = 0;
            clicked = 0;
        } 
    });
};

//redjanje slicica
function setPic(){
    for (var i=0; i<allPictures.length; i++){
       //var pic je objekat koji je deo niza
        var pic = allPictures[i]; 
        document.querySelector('.pictures').innerHTML += '<div class="pictures-back"> <img class="img" src="' + pic.img + '"style="width:150px;height:100px;" value="' + pic.ime +'" ></div>';
    }
}

//promesati slicice
function mixPic(){
    var random = 0;
    var tmp = 0;
    for(var i=0; i<allPictures.length; i++){
        // math.floor zaokruzuje na manju vrednost a math ceil na vecu
        random = Math.floor(Math.random()*allPictures.length);
        //trenutna promenljiva
        tmp = allPictures[i];
        //pripisivanje vrednosti trenutne i nove
        allPictures[i]=allPictures[random];
        //nova je sada trenutna
        allPictures[random]= tmp;
    }
}

function changeTime() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    $('.img').hide();
    
    if(int){
        clearInterval(int);
        int = null;
    } 

    if(selectedValue === 'easy') {
        time = 180;
    } else if (selectedValue === 'hard'){
        time = 60;  
    } else {
        time = 120;
    }

    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    formatTimer(minutes, seconds);
    return time;
}

function formatTimer(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    $('#time').html(minutes +":"+ seconds);
}