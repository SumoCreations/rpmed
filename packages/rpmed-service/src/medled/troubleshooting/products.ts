import batteryCharger from './img/battery_charger.jpg'
import classic from './img/classic.jpg'
import focus from './img/focus.jpg'
import hyperlite from './img/hyperlite.png'
import mc3 from './img/mc3.jpg'
import mc6 from './img/mc6.jpg'
import mc7 from './img/mc7pro.jpg'
import other from './img/other.jpg'

export interface IProductOption {
  name: string
  description: string
  img: string
  priority: number
}

const products: IProductOption[] = [
  {
    description: '(MC-XX-XX)',
    img: mc3,
    name: 'MedLED Chrome® MC3',
    priority: 3,
  },
  {
    description: '(MC-XX-XX)',
    img: mc6,
    name: 'MedLED Chrome® MC6',
    priority: 3,
  },
  {
    description: '(MC-XX-XX)',
    img: mc7,
    name: 'MedLED Chrome® MC7',
    priority: 3,
  },
  {
    description: '(MLF03/MLF03r)',
    img: focus,
    name: 'MedLED Focus®',
    priority: 0,
  },
  {
    description: '(MLH01)',
    img: hyperlite,
    name: 'MedLED Hyperlite®',
    priority: 0,
  },
  {
    description: '(ML001)',
    img: classic,
    name: 'MedLED Classic™',
    priority: 1,
  },
  {
    description: '',
    img: batteryCharger,
    name: '4-Bay Charging Dock',
    priority: 0,
  },
  {
    description: '(MLS01)',
    img: mc6,
    name: 'MedLED Sapphire®',
    priority: 1,
  },
  {
    description: '(MLOX01)',
    img: mc3,
    name: 'MedLED Onyx®',
    priority: 1,
  },
  {
    description: 'Product not listed here?',
    img: other,
    name: 'Other',
    priority: -1,
  },
]

export default products
