document.addEventListener('DOMContentLoaded', renderGraph)
document.querySelector('.refresh').onclick = renderGraph

function renderGraph () {
  console.clear()
  console.log(new Date().toLocaleTimeString('en-GB'))

  const margin = { top: 50, bottom: 50, left: 50, right: 50 }

  const graphWidth = 800
      , graphHeight = 300

      , svgWidth = graphWidth + margin.left + margin.right
      , svgHeight = graphHeight + margin.top + margin.bottom

      , dataSetSize = 900
      , normaliser = 100

  d3.select('.root').selectAll('*').remove()

  const svg = d3.select('.root')
                 .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)

  const canvas = svg.append('g')
                    .attr('class', 'canvas')
                    .attr('transform', `translate(${margin.left}, ${margin.right})`)

  const randomDataPoint = () => Math.floor(Math.random()*normaliser)
  const biasedDataPoint = (bias, weight) => {
    const rnd = Math.random() * normaliser
    const mix = Math.random() * weight
    let out = Math.floor(rnd * (1 - mix) + bias * mix)
    // console.log({ rnd, mix, out })
    return out
  }





  const multipleBiasDataPoint = ([...biases], max, min, weight) => {
    const range = (max - min) + min
    const baseRandom = Math.random() * range
    const mixBaseToBias = Math.random() * weight
    const mixBiasStep = mixBaseToBias / biases.length
    let biasRunning = 0
    biases.forEach(each => biasRunning += each * mixBiasStep)
    let out = Math.floor(baseRandom * (1 - mixBaseToBias) + biasRunning)
    // console.log({ baseRandom, mixBaseToBias, out })
    return out
  }


  function splitter (func, min, max, cellPoints) {
    const val = func()
    const range = (max - min) + min
    const percent = (val / range)
    const step = 1 / cellPoints.length
    const thisStep = Math.floor(percent / step)
    return thisStep
  }

  function cell ([...biases], min, max, weight) {
    const func = () => multipleBiasDataPoint(biases, max, min, weight)
    return splitter(func, min, max, biases)
  }

  console.log({ testy: multipleBiasDataPoint([20,20,20], 100, 0, 1) })
  console.log({ testy: multipleBiasDataPoint([20,20,20], 100, 0, 1) })
  console.log({ testy: multipleBiasDataPoint([20,20,20], 100, 0, 1) })
  console.log({ testy: multipleBiasDataPoint([20,20,20], 100, 0, 1) })
  console.log({ testy: multipleBiasDataPoint([20,20,20], 100, 0, 1) })
  console.log({ testy: multipleBiasDataPoint([20,20,20], 100, 0, 1) })
  console.log({ test: splitter(() => multipleBiasDataPoint([20,20,20], 100, 0, 1), 0, 100, [20,20,20,20,20]) })


  console.log(splitter(() => biasedDataPoint(75, .5), 0, 100, [4, 60, 100]))






  const randomData = []
  for (let i=0; i<dataSetSize/2; i++) randomData.push(biasedDataPoint(32, 1))
  for (let i=0; i<dataSetSize/2; i++) randomData.push(biasedDataPoint(75, 1))
  // for (let i=0; i<randomData.length / 2; i++) randomData[Math.floor(Math.random()*randomData.length)] = 50
  console.log({ randomData })

  const talley = randomData.reduce((acc, each) => {
    if (!acc[each]) acc[each] = 0
    acc[each] ++
    return acc
  }, {})

  const talleyArr = []
  const keys = Object.keys(talley)
  for (let i=0; i<keys.length; i++) talleyArr.push({ idx: i, value: talley[keys[i]] })

  console.log({ talley, talleyArr })



  const maxIdx = talleyArr.reduce((acc, each) => acc.idx > each.idx ? acc : each)['idx']
  const minVal = talleyArr.reduce((acc, each) => acc.value < each.value ? acc : each)['value']
  const maxVal = talleyArr.reduce((acc, each) => acc.value > each.value ? acc : each)['value']

  const averageVal = talleyArr.reduce((acc, each) => acc += each.value, 0) / talleyArr.length

  console.log({ maxIdx, minVal, maxVal, averageVal })

  const scaleX = d3.scaleLinear()
                    .domain([0, maxIdx])
                    .range([0, graphWidth])
  let testDataSetSize = dataSetSize / 20
  const scaleY = d3.scaleLinear()
                    .domain([-testDataSetSize, testDataSetSize])
                    .range([0, graphHeight])

  const middle = (dataSetSize / 2) - averageVal
  console.log(middle)
  console.log(talleyArr.length)
  const points = canvas.append('g')
                    .selectAll('circle')
                    .data(talleyArr)
                    .enter()
                    .append('circle')
                    .attr('r', 2)
                    .attr('cx', (d, i) => scaleX(i))
                    .attr('cy', (d, i) => scaleY(talley[i]))

  const verticalAxis = d3.axisLeft(scaleY)
                         .ticks(4)

                     canvas.append('g')
                        .call(verticalAxis)
                        .attr("transform", "translate(-10, 0)")

  // const divider = ((maxVal-minVal)+minVal) / 2
  // console.log(randomData.length)
  // const zero = randomData.reduce((acc, each) => each <= divider ? acc += each : acc, 0)
  // const one = randomData.reduce((acc, each) => each > divider ? acc += each : acc, 0)
  // console.log({ zero, one })

}
