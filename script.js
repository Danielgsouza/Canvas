//initial Data
let currentColor = 'black'
let canDraw = false
let mouseX = 0
let mouseY = 0

let screen = document.querySelector('#tela')
let context = screen.getContext('2d')

//Events
document.querySelectorAll('.colorArea .color').forEach(item =>{
    item.addEventListener('click', colorClickEvent)
})

/* 
Passo a passo para desenhar com o canvas:
-Quando o click do mouse for apertado, ativar o modo desenho.
-quando o mouse se MOVER, se o modo desenho estiver ativado, desenhe.
-Quando o click do mouse for removido (Levantado), desativar o modo desenho
*/
screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)
document.querySelector('.clear').addEventListener('click', clearScreen)


//Functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color')
    currentColor = color
    document.querySelector('.color.active').classList.remove('active')
    e.target.classList.add('active')

}

function mouseDownEvent(e) {
    canDraw = true
    mouseX = e.pageX - screen.offsetLeft
    mouseY = e.pageY - screen.offsetTop
}

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY)
    }
}

function mouseUpEvent() {
    canDraw = false
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    context.beginPath()
    context.lineWidth = 5
    context.lineJoin = 'round'
    context.moveTo(mouseX, mouseY)
    context.lineTo(pointX, pointY)
    context.closePath()
    context.strokeStyle = currentColor
    context.stroke()

    mouseX = pointX
    mouseY = pointY
}

function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, context.canvas.width, context.canvas.height )
}

function downloadEvent() {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.getElementById('tela');
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
      
}

