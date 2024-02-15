const calculate = document.querySelector("#preview")
const used = document.querySelector("#used")
const printResult = document.querySelector("#result")
const canvas = document.querySelector("#cutPaper")
const app = document.querySelector("#app")

calculate.addEventListener("click", runApp)

async function runApp(e) {
    e.preventDefault()
    const paper = await getPaper()

    if (paper !== undefined) {
        const cut = await getCutPaper(paper.percentage, paper.area)
        if (cut !== undefined) {
            const restultWidthWidth = Math.floor(paper.width / cut.width)
            const resultHeightHeight = Math.floor(paper.height / cut.height)
            const quantityWidthWidth = restultWidthWidth * resultHeightHeight

            const resultWidthHeight = Math.floor(paper.width / cut.height)
            const resultHeightWidht = Math.floor(paper.height / cut.width)
            const quantityWidthHeight = resultWidthHeight * resultHeightWidht

            if (quantityWidthWidth > quantityWidthHeight) {
                const usedArea = cut.percentage * quantityWidthWidth
                const unsedArea = paper.percentage - usedArea
                const result = {
                    width: restultWidthWidth,
                    height: resultHeightHeight,
                    usedArea: usedArea.toFixed(2),
                    unsedArea: unsedArea.toFixed(2),
                    quantity: quantityWidthWidth,
                    horizontal: true,
                    cutWidth: cut.width,
                    cutHeight: cut.height,
                    paperWidth: paper.width,
                    paperHeight: paper.height
                }

                initialCanvas(canvas, paper, cut, result)

                printMessage(result)
            } else {
                const usedArea = cut.percentage * quantityWidthHeight
                const unsedArea = paper.percentage - usedArea
                const result = {
                    width: resultWidthHeight,
                    height: resultHeightWidht,
                    usedArea: usedArea.toFixed(2),
                    unsedArea: unsedArea.toFixed(2),
                    quantity: quantityWidthHeight,
                    horizontal: false,
                    cutWidth: cut.width,
                    cutHeight: cut.height,
                    paperWidth: paper.width,
                    paperHeight: paper.height
                }

                initialCanvas(canvas, paper, cut, result)

                printMessage(result)
            }
        }
    }
}

async function getPaper() {
    const paper = {
        width: await document.querySelector("#paper-width").value,
        height: await document.querySelector("#paper-height").value,
        area: undefined,
        percentage: 100
    }

    if (paper.width === "" || paper.height === "") {
        return printMessage({ isAlert: true, message: "Preencha as medidas do papel!" })
    }

    paper.area = calculateArea(paper.width, paper.height)

    return paper
}

async function getCutPaper(paperPercentage, paperArea) {
    const cut = {
        width: await document.querySelector("#cut-width").value,
        height: await document.querySelector("#cut-height").value,
        area: undefined,
        percentage: undefined
    }

    if (cut.width === "" || cut.height === "") {
        printMessage({ isAlert: true, message: "Preencha as medidas do corte!" })
        return
    }

    cut.area = calculateArea(cut.width, cut.height)
    cut.percentage = caculatePercentage(cut.area, paperPercentage, paperArea)

    return cut
}

function printMessage({ usedArea, unsedArea, quantity, cutWidth, cutHeight, paperWidth, paperHeight, isAlert, message }) {
    if (isAlert === true) {
        used.innerHTML = ""
        used.innerHTML = `<span class="warning">⚠️ <strong>${message}</srong></span>`
        return
    }
    used.innerHTML = `<span class="success">${usedArea}% utilizado</span><span class="danger">${unsedArea}% não utilizado</span>`
    printResult.innerHTML = `<span>Cabe <strong>${quantity}</strong> tamanhos <strong>${cutWidth}x${cutHeight}mm</strong>, em ${paperWidth}x${paperHeight}cm</span>`
}

function calculateArea(width, height) {
    return width * height
}

function caculatePercentage(cutArea, paperPercentagem, paperArea) {
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

    draw(ctx, result.width, result.height, result.quantity, canvas.width, canvas.height, cutWidth, cutHeight, result.horizontal)

}

function draw(ctx, qtWidth, qtHeight, total, canvasWidth, canvasHeight, cutWidth, cutHeight, horizontal) {

    let gridWidth = 0
    let gridHeight = 0

    if (horizontal) {
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
}