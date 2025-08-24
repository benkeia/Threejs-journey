import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Cursor
 */
const cursor = {

    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{


    cursor.x = event.clientX / sizes.width - 0.5 // Normalize to [-0.5, 0.5]
    cursor.y = event.clientY / sizes.height - 0.5 // Normalize to [-0.5, 0.5]
    //console.log(event.clientX, event.clientY)
    //console.log(event.x, event.y)
    //console.log(event.screenX, event.screenY)
    //console.log(event.offsetX, event.offsetY)
}
)


/**
 * Object
 */





const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

scene.add(cube)
//axes 

const axesHelper = new THREE.AxesHelper()

//scale





scene.add(axesHelper)
/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */

const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)

//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(cube.position) // Look at the cube



scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//Time

//Clock

const clock = new THREE.Clock()


// Animation


gsap.to(cube.position, { duration: 1, delay: 2, x: 2 })
gsap.to(cube.position, { duration: 1, delay: 4, x: 0 })



const tick = () =>
{

    const elapsedTime = clock.getElapsedTime() // seconds
 

    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
     
    
    camera.lookAt(cube.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}
tick()