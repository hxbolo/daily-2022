import createHeading from './heading.js'
import icon from'./icon2.png'
const heading = createHeading()
document.body.append(heading)

const img = new Image()
img.src = icon
document.body.append(img)
// import './main.css'
// import footHtml from './foot.html'
// document.write(footHtml)

// import about from './about.md'
// console.log(about);