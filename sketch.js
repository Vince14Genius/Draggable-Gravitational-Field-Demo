// P5 Template with fps Display

// Variables used for fps
var frameTimes = [] // Time recordings corresponding to each frame
let oldTime = 0 // Time at which the previous frame is updated
let fpsCooldown = 0 // When fpsCooldown <= 0, set displayFPS = fps
let displayFPS = 0 // fps displayed on screen, updated every second

var objectX = 250
var objectY = 0
var objectVX = 0
var objectVY = 6.5

var referenceX = 0
var referenceY = 0

function setup() {
    // setup() runs once. Put your setup code here.

    createCanvas(windowWidth, windowHeight)
}

function draw() {
    // draw() runs every time before a new frame is rendered. 

    background(20)

    for (var radius = 40; radius < windowWidth; radius += 40) {
        noFill()
        stroke(255, 255 / Math.pow(radius / 40, 2))
        strokeWeight(2)
        ellipse(windowWidth / 2 + referenceX, windowHeight / 2 + referenceY, radius * 2, radius * 2)
        noStroke()
    }

    // Update Velocity
    var distance = Math.sqrt(Math.pow(objectX - referenceX, 2) + Math.pow(objectY - referenceY, 2))
    var angle = Math.atan2(objectY - referenceY, objectX - referenceX)
    var gravitationalAcceleration = -10000 / (distance * distance)
    if (distance === 0) {
        gravitationalAcceleration = 0
        objectVX = 0
        objectVY = 0
    }
    objectVX += gravitationalAcceleration * Math.cos(angle)
    objectVY += gravitationalAcceleration * Math.sin(angle)

    // Decay
    // objectVX *= 0.999
    // objectVY *= 0.999

    // Update Position
    objectX += objectVX
    objectY += objectVY

    // Draw
    fill(0, 100, 100)
    ellipse(windowWidth / 2 + objectX, windowHeight / 2 + objectY, 30, 30)

    // Display FPS

    var currentTime = millis()
    frameTimes.push(currentTime)
    while (frameTimes.length > 0 && frameTimes[0] < currentTime - 1000) {
        frameTimes.splice(0, 1)
    }
    
    fpsCooldown -= currentTime - oldTime
    if (fpsCooldown <= 0) {
        displayFPS = frameTimes.length
        fpsCooldown = 1000
    }

    fill(100)
    textAlign(RIGHT, TOP) // Text alignment of the fps label
    textSize(24)
    text(`${Math.floor(displayFPS)} fps`, width - 16, 16) // Position of the fps label

    oldTime = currentTime
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function moveReferencePoint() {
    referenceX = mouseX - windowWidth / 2
    referenceY = mouseY - windowHeight / 2
}

function mousePressed() {
    moveReferencePoint()
}

function mouseDragged() {
    moveReferencePoint()
}