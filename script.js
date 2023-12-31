const calculate = document.querySelector("#preview")
const used = document.querySelector("#used")
const printResult = document.querySelector("#result")
const canvas = document.querySelector("#cutPaper")
const app = document.querySelector("#app")

calculate.addEventListener("click", runApp)

function runApp(e) {
    e.preventDefault()
    const paper = {
        width: document.querySelector("#paper-width").value,
        height: document.querySelector("#paper-height").value,
        area: undefined,
        percentage: 100
    }
    
    paper.area = calculateArea(paper.width, paper.height)
    
    const cut = {
        width: document.querySelector("#cut-width").value,
        height: document.querySelector("#cut-height").value,
        area: undefined,
        percentage: undefined
    }
    cut.area = calculateArea(cut.width, cut.height)
    cut.percentage = caculatePercentage(cut.area, paper.percentage, paper.area)

    const restultWidthWidth = Math.floor(paper.width / cut.width)
    const resultHeightHeight = Math.floor(paper.height / cut.height)
    const quantityWidthWidth = restultWidthWidth * resultHeightHeight

    const resultWidthHeight = Math.floor(paper.width / cut.height)
    const resultHeightWidht = Math.floor(paper.height /  cut.width)
    const quantityWidthHeight = resultWidthHeight * resultHeightWidht

    
    if(quantityWidthWidth > quantityWidthHeight) {
        const usedArea = cut.percentage * quantityWidthWidth
        const unsedArea = paper.percentage - usedArea
        const result = {
            width: restultWidthWidth,
            height: resultHeightHeight,
            usedArea: usedArea.toFixed(2),
            unsedArea: unsedArea.toFixed(2),
            quantity: quantityWidthWidth,
            horizontal: true
    
        }

        initialCanvas(canvas, paper, cut, result)
        
        used.innerHTML = `<span>${result.usedArea}% utilizado</span><span>${result.unsedArea}% não utilizado</span>`
        printResult.innerHTML = `<span>Cabe <strong>${result.quantity}</strong> tamanhos <strong>${cut.width}x${cut.height}cm</strong>, em ${paper.width}x${paper.height}cm</span>`
    }else {
        const usedArea = cut.percentage * quantityWidthHeight
        const unsedArea = paper.percentage - usedArea
        const result = {
            width: resultWidthHeight,
            height: resultHeightWidht,
            usedArea: usedArea.toFixed(2),
            unsedArea: unsedArea.toFixed(2),
            quantity: quantityWidthHeight,
            horizontal: false
    
        }
        
        initialCanvas(canvas, paper, cut, result)
        used.innerHTML = `<span>${result.usedArea}% utilizado</span><span>${result.unsedArea}% não utilizado</span>`
        printResult.innerHTML = `<span>Cabe <strong>${result.quantity}</strong> tamanhos <strong>${cut.width}x${cut.height}cm</strong>, em ${paper.width}x${paper.height}cm</span>`
    }
}

function calculateArea(width, height) {
    return width * height
}

function caculatePercentage (cutArea, paperPercentagem, paperArea) {
    return (cutArea * paperPercentagem) / paperArea
}

function initialCanvas(canvas, paper, cut, result) {
    const ctx = canvas.getContext("2d")
    
    const paperWidth = Math.max(paper.width, paper.height)
    const paperHeight = Math.min(paper.width, paper.height)
    const i = (app.offsetWidth - 40) / paperWidth

    const cutWidth = Math.max((cut.width * i), (cut.height * i))
    const cutHeight = Math.min((cut.width * i), (cut.height * i))

    canvas.width = `${paperWidth * i}`
    canvas.height = `${paperHeight * i}`

    canvas.style.backgroundColor = "gray"
    canvas.style.borderRadius = "0"
    
    ctx.fillStyle = "white"
    ctx.strokeStyle = "black"
    ctx.font = '12px serif'

    draw(ctx, result.width, result.height, result.quantity, canvas.width,canvas.height, cutWidth,cutHeight, result.horizontal)

    // ctx.fillStyle = "black"
    // ctx.fillText(cut.height,(cut.height * i) / 2,(cut.width * i) - 1)
    // ctx.fillText(cut.width,(cut.height * i) /+ 1,(cut.width * i) / 2)

}

function draw(ctx,qtWidth, qtHeight, total, canvasWidth, canvasHeight, cutWidth, cutHeight, horizontal) {
    
    let gridWidth = 0
    let gridHeight = 0

    if(horizontal) {
        gridWidth = cutWidth
        gridHeight = cutHeight
    } else {
        gridWidth = cutHeight
        gridHeight = cutWidth
    }


    for (var x = 0; x <= canvasWidth; x += gridWidth) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }

    for (var y = 0; y <= canvasHeight; y += gridHeight) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }

    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 1;


    ctx.stroke();








    // for (let index = 0; index < qtWidth; index++) {
    //     let c = canvasWidth/qtWidth

    //     ctx.fillRect(0,0, canvasWidth/qtWidth, canvasHeight/qtHeight)
    //     ctx.strokeRect(0,0, canvasWidth/qtWidth, canvasHeight/qtHeight)

    //     ctx.fillRect(c,0, canvasWidth/qtWidth, canvasHeight/qtHeight)
    //     ctx.strokeRect(c,0, canvasWidth/qtWidth, canvasHeight/qtHeight)
        
    // }
}