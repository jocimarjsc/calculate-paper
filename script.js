const paperWidth = 100
const paperHeight = 70
const paperArea = paperWidth * paperHeight
const paperUsedPercentage = 100

const cutWidth = 47
const cutHeight = 33
const cutArea = cutWidth * cutHeight
const cutUsedPercentage = (cutArea * paperUsedPercentage) / paperArea

const restultWidthWidth = Math.floor(paperWidth / cutWidth)
const resultHeightHeight = Math.floor(paperHeight / cutHeight)
const quantityWidthWidth = restultWidthWidth * resultHeightHeight

const resultWidthHeight = Math.floor(paperWidth / cutHeight)
const resultHeightWidht = Math.floor(paperHeight /  cutWidth)
const quantityWidthHeight = resultWidthHeight * resultHeightWidht

if(quantityWidthWidth > quantityWidthHeight) {
    const usedArea = cutUsedPercentage * quantityWidthWidth
    const unsedArea = paperUsedPercentage - usedArea
    const result = {
        width: restultWidthWidth,
        height: resultHeightHeight,
        usedArea: usedArea.toFixed(2),
        unsedArea: unsedArea.toFixed(2),
        quantity: quantityWidthWidth

    }
    console.log(result)
}else {
    const usedArea = cutUsedPercentage * quantityWidthHeight
    const unsedArea = paperUsedPercentage - usedArea
    const result = {
        width: resultWidthHeight,
        height: resultHeightWidht,
        usedArea: usedArea.toFixed(2),
        unsedArea: unsedArea.toFixed(2),
        quantity: quantityWidthHeight

    }
    console.log(result)
}

const calculate = document.querySelector("#preview")
const used = document.querySelector("#used")
const printResult = document.querySelector("#result")

calculate.addEventListener("click", e => {
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
            quantity: quantityWidthWidth
    
        }
        
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
            quantity: quantityWidthHeight
    
        }
        
        used.innerHTML = `<span>${result.usedArea}% utilizado</span><span>${result.unsedArea}% não utilizado</span>`
        printResult.innerHTML = `<span>Cabe <strong>${result.quantity}</strong> tamanhos <strong>${cut.width}x${cut.height}cm</strong>, em ${paper.width}x${paper.height}cm</span>`
    }
    
})

function calculateArea(width, height) {
    return width * height
}

function caculatePercentage (cutArea, paperPercentagem, paperArea) {
    return (cutArea * paperPercentagem) / paperArea
}