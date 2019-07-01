export function getImage(photoName) {
  switch (photoName) {
    case 'Entrainement':
      return require('../Images/TypeEvent/Entrainement.png')
    case 'Formation':
      return require('../Images/TypeEvent/Formation.png')
    case 'Reunion':
      return require('../Images/TypeEvent/Reunion.png')
    case 'Medical':
      return require('../Images/TypeEvent/Medical.png')
    default:

  }
}
