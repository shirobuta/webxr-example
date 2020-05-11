var bg
var modelViewer
var author
var quote
var stageIndex = 0

var select = function(s) {
    return document.querySelector(s);
}
var selectAll = function(s) {
    return document.querySelectorAll(s);
}

function onLoad(){
    bg = document.querySelector("#bg")
    modelViewer = document.querySelector("#astronaut")
    modelViewer.addEventListener("load", onModelLoad) 
    author = document.querySelector("#author")   
    quote = document.querySelector("#quote")   

    let buttons = modelViewer.querySelectorAll('button')
    for (var i=0; i<buttons.length; i++){
        buttons[i].addEventListener('click', onAnnotationsClick)
    }

    let pgButtons = selectAll('#pagination .button')
    for (var i=0; i<pgButtons.length; i++){
        pgButtons[i].addEventListener('click', onPageClicked)
    }
}

function onModelLoad(){
    setTimeout(()=>{
        modelViewer.style.opacity = 1;
        setStage()
    }, 500)
}

function onPageClicked(e){
    let target = e.target
    let pgButtons = selectAll('#pagination .button')
    for (var i=0; i<pgButtons.length; i++){
        pgButtons[i].classList.remove('active')
        stageIndex = target == pgButtons[i] ? i : stageIndex
    }
    target.classList.add('active')
    setStage()
}

function setStage(){
    let settings = quotes[stageIndex]
    modelViewer.cameraOrbit = settings.cameraOrbit
    modelViewer.cameraTarget = settings.cameraTarget
    modelViewer.cameraControls = settings.cameraControls
    author.innerHTML = settings.author
    quote.innerHTML = settings.quote
    
    var classList = bg.classList;
    while (classList.length > 0) {
        classList.remove(classList.item(0));
    }

    setTimeout(()=>{
        if(settings.showAnon){
            let buttons = modelViewer.querySelectorAll('button')
            for (var i=0; i<buttons.length; i++){
                buttons[i].removeAttribute('data-active')
            }
            modelViewer.setAttribute('data-show-anon', settings.showAnon)
        }else{
            modelViewer.removeAttribute('data-show-anon')
        }
        bg.classList.add(`layout-${stageIndex}`)
    }, 100)
}

function onAnnotationsClick(evt){
    let target = evt.target
    let buttons = modelViewer.querySelectorAll('button')
    for (var i=0; i<buttons.length; i++){
        buttons[i].removeAttribute('data-active')
    }
    target.setAttribute('data-active', true)
    
}

let quotes = [
    { 
        cameraOrbit:"50deg 70deg 4.5m",
        cameraTarget:"-1.5m .6m auto",
        cameraFieldOfView: "45deg",
        author:"- Albert Einstein",
        quote:"Only two things are infinite,<br>the universe and human stupidity.<br< And I'm not sure about the former. "
    },
    { 
        cameraOrbit:"auto auto 0.8m",
        cameraTarget:"auto 1.9m auto",
        cameraFieldOfView: "45deg",
        author:"- Fred Hoyle",
        quote:"Technology is a way of organizing the universe so that man doesn't have to experience it. "
    },
    { 
        cameraOrbit:"auto -20deg 2m",
        cameraTarget:"auto -.6m auto",
        cameraFieldOfView: "10deg",
        author:"- Rich Cook",
        quote:"Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning."
    },
    { 
        cameraOrbit:"125deg auto 1.3m",
        cameraTarget:"auto 1.5m -.5m",
        cameraFieldOfView: "10deg",
        author:"- Henry David Thoreau",
        quote:"The universe seems <br> bankrupt as soon as <br> we begin  to discuss  <br>  the characters of  <br> individuals."
    },
    { 
        showAnon:true,
        cameraControls:true,
        cameraOrbit:"auto auto 4m",
        cameraTarget:"auto .7m auto",
        author:"- Doctor Who",
        quote:"All of time and space. <br>Everywhere and anywhere.<br>Where do you want to start?"
    }
]