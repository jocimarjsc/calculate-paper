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

console.log({ quantityWidthWidth, quantityWidthHeight })

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

const paper = {
    width: 100,
    height: 70,
    area: undefined,
    percentage: 100
}

paper.area = calculateArea(paper.width, paper.height)

const cut = {
    width: 35,
    height: 25,
    area: undefined,
    percentage: undefined
}
cut.area = calculateArea(cut.width, cut.height)
cut.percentage = caculatePercentage(cut.area, paper.percentage, paper.area)

console.log({ paper, cut })

function calculateArea(width, height) {
    return width * height
}

function caculatePercentage (cutArea, paperPercentagem, paperArea) {
    return (cutArea * paperPercentagem) / paperArea
}