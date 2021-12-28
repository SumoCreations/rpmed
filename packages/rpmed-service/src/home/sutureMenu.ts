import {
  faCommentsAlt,
  faCommentSmile,
  faFileCertificate,
  faFileInvoiceDollar,
  faHandHoldingWater,
  faRulerTriangle,
  faFilePdf,
} from '@fortawesome/pro-light-svg-icons'

import { faSnake } from '@fortawesome/pro-solid-svg-icons'

import { IMenuSection } from './types'

const sutureMenu: IMenuSection[] = [
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
        title: 'Suture Catalog',
        icon: faFilePdf,
        link: '/d/suturecat',
        description: 'Brochure on Wound Closure Products',
      },
      {
        title: 'PTFE Suture Brochure',
        icon: faFilePdf,
        link: '/d/ptfesut',
        description: 'For more information on Monotex® PTFE Surgical Suture',
      },
      {
        title: 'Adhesive Brochure',
        icon: faFilePdf,
        link: '/d/adhesives',
        description: 'For more information on Riverpoint Tissue Adhesive',
      },
      {
        title: 'Skin Stapler Brochure',
        icon: faFilePdf,
        link: '/d/stapler',
        description: 'For more information on Riverpoint Skin Staplers',
      },
      {
        description:
          'Brochure for OEM Sutures, Tapes, Loops, Needles, Anchors & More.',
        icon: faFilePdf,
        link: '/d/oemsurfib',
        title: 'OEM Surgical Fibers & Devices Catalog',
      },
    ],
  },
  {
    heading: 'Literature (Technical)',
    items: [
      {
        description: 'Product sizing and exact measurement details.',
        icon: faRulerTriangle,
        link: '/d/needlechart',
        title: 'Needle Chart',
      },
      {
        description:
          'A detailed comparison of tensile strength across our product families.',
        icon: faHandHoldingWater,
        link: '/d/sutureabs',
        title: 'Suture Absorption',
      },
      {
        description:
          'Enhances visibility, especially in blood & smaller surgery sites.',
        icon: faSnake,
        link: '/d/cobrablack',
        title: 'CobraBlack® Needles',
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

export default sutureMenu
