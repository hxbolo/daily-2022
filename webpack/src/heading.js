import './heading.css'
export default () => {
  const element = document.createElement('h2')
  element.textContent = 'hx'
  element.classList.add('heading')
  element.addEventListener('click', () => {
    alert('hhhx')
  })
  return element
}
