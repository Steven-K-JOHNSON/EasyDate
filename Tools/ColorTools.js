export function getColor(number) {
  var color = [
    '#2980b9',
    '#8e44ad',
    '#f39c12',
    '#c0392b',
    '#27ae60',
    '#2c3e50'
  ]

  return color[number % color.length]
}
