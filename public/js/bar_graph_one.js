

const root = d3.select('.root')

root.selectAll('*').remove()

const margin = { top: 50, bottom: 50, left: 50, right: 50 }

const canvasWidth = 800
    , canvasHeight = 300

    , graphWidth = canvasWidth + margin.left + margin.right
    , graphHeight = canvasHeight + margin.top + margin.bottom

    , sampleSize = 1000

const svg = root.append('svg')
                .attr('width', graphWidth)
                .attr('height', graphHeight)

const canvas = svg.append('g')
                  .attr('transform', `translate(${margin.left}, ${margin.top})`)


function randomBiasedPoint (min, max, [...biases], weight) {
  const range = (max - min) + min
  const base = Math.random() * range
  const mixRatio = Math.random() * weight
  const mixRatioSplit = mixRatio / biases.length
  let bias = 0
  biases.forEach(each => bias += each * mixRatioSplit)
  const out = base * (1 - mixRatio) + bias
  return out
}


const randomData = []
for (let i=0; i<sampleSize; i++) {
  randomData.push( randomBiasedPoint(0, 100, [25, 40], 1) )
}

const minVal = randomData.reduce((acc, each) => acc < each ? acc : each)
const maxVal = randomData.reduce((acc, each) => acc > each ? acc : each)

console.log({ minVal, maxVal })

const scaleX = d3.scaleLinear()
                  .domain([0, randomData.length])
                  .range([0, canvasWidth])

const scaleY = d3.scaleLinear()
                  .domain([minVal, maxVal])
                  .range([0, canvasHeight])


const points = canvas.append('g')
                      .selectAll('circle')
                      .data(randomData)
                      .enter()
                      .append('circle')
                      .attr('r', 1)
                      .attr('cx', (d, i) => scaleY((canvasWidth/randomData.length) * i))
                      .attr('cy', d => scaleY(d))

const axisY = d3.axisLeft(scaleY).ticks(5)

canvas.append('g')
   .call(axisY)
   .attr("transform", "translate(-10, 0)")

const axisX = d3.axisTop(scaleX).ticks(5)

canvas.append('g')
   .call(axisX)
   .attr("transform", "translate(0, -10)")
