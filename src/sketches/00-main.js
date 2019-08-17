let y = 0
let x = 0
let xoff = 0
let yoff = 9990

const colors = [
  '#42273B',
  '#70566D',
  '#ABC9C0',
  '#9EE493',
  '#AF7595',
  '#8C2155'
]

class Walker {
  constructor() {
    this.pos = createVector(width / 2, height / 2)
    this.size = random(10, 20)

    this.xoff = random(10000)
    this.yoff = random(99999)

    this.color = color(colors[floor(random(1, colors.length))])
    this.color.setAlpha(150)
  }

  step() {
    const step = p5.Vector.random2D()
    step.mult(-8, 8)

    this.pos.add(step)
  }

  render() {
    fill(this.color)
    rectMode(CENTER)
    rect(this.pos.x, this.pos.y, this.size, this.size)
  }
}

let els = []
let numEls = 400
export function setup() {
  createCanvas(innerWidth, innerHeight)
  background('#DAF7DC')

  noStroke()

  for (let i = 0; i < numEls; i++) {
    els.push(new Walker())
  }
}

export function draw() {
  els.forEach(el => {
    el.step()
    el.render()
  })
}

let paused = false
export function keyPressed() {
  if (key === ' ') {
    if (paused) {
      loop()
    } else {
      noLoop()
    }
    paused = !paused
  }
}
