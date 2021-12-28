import {
  faFileInvoiceDollar,
  faCommentsAlt,
  faCommentSmile,
  faFilePdf,
} from '@fortawesome/pro-light-svg-icons'

import { IMenuSection } from './types'

const oncologyMenu: IMenuSection[] = [
  {
    heading: 'Service',
    items: [
      {
        description:
          'Learn how to buy a Headlight or get a free trial & quote.',
        icon: faFileInvoiceDollar,
        link: '/sutures/quote',
        title: 'Request a Quote',
      },
    ],
  },
  {
    heading: 'Literature (Sales)',
    items: [
      {
        description:
          'For more information on Riverpoint Brachytherapy Needles & Devices.',
        icon: faFilePdf,
        link: '/d/oncology',
        title: 'Oncology Catalog',
      },
    ],
  },
  {
    heading: 'Contact',
    items: [
      {
        description: 'Please reach out with any feedback or questions.',
        icon: faCommentsAlt,
        link: '/contact',
        title: 'Contact Us',
      },
      {
        description: 'Take a Look at our MedLED® Champions',
        icon: faCommentSmile,
        link: 'https://rpmed.com/pages/testimonials',
        title: 'Testimonials',
      },
      {
        blank: true,
        title: '',
      },
    ],
  },
]

export default oncologyMenu
