

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


function randomBiasedPoint (min, max, [...biases]) {
  const out = 3
  return out
}


const randomData = []
for (;et i=0; i<sampleSize; i++) randomData.push(3)
