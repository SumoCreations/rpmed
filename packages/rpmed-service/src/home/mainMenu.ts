import { faInfoCircle } from '@fortawesome/pro-light-svg-icons'

import { IMenuSection } from './types'

const medledMenu: IMenuSection[] = [
  {
    heading: 'Support',
    items: [
      {
        description: 'For more information and support on Fibers & Devices.',
        icon: faInfoCircle,
        link: '/surgical',
        title: 'Surgical Fibers & Devices',
      },
      {
        description: 'For more information and support on Wound Closure',
        icon: faInfoCircle,
        link: '/suture',
        title: 'Sutures',
      },
      {
        description: 'For more information on MedLED Products',
        icon: faInfoCircle,
        link: '/medled',
        title: 'MedLED®',
      },
      {
        description: 'For more information on Brachytherapy Needles & Devices',
        icon: faInfoCircle,
        link: '/oncology',
        title: 'Oncology',
      },
    ],
  },
]

export default medledMenu
