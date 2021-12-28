import {
  faAmbulance,
  faBatteryQuarter,
  faCommentsAlt,
  faCommentSmile,
  faFileCertificate,
  faFileInvoiceDollar,
  faFilePdf,
  faGlobeAfrica,
  faPoll,
  faQuestionCircle,
  faTools,
} from '@fortawesome/pro-light-svg-icons'

import { IMenuSection } from './types'

const medledMenu: IMenuSection[] = [
  {
    heading: 'Service Your MedLED',
    items: [
      {
        description: "48-Hour Turnaround with MedLED's Signature Service.",
        icon: faAmbulance,
        link: '/medled/service-request',
        title: 'Service My Headlight',
      },
      {
        description: 'Find common problems &amp; solutions to your product.',
        icon: faTools,
        link: '/medled/troubleshooting',
        title: 'Troubleshoot',
      },
      {
        description:
          'Get new batteries at no charge using our recycling program.',
        icon: faBatteryQuarter,
        link: '/medled/batteries',
        title: 'Battery Recycling',
      },
    ],
  },
  {
    heading: 'Get a MedLED',
    items: [
      {
        description:
          'Learn how to buy a Headlight or get a free trial & quote.',
        icon: faFileInvoiceDollar,
        link: '/medled/quote',
        title: 'Request a Quote',
      },
      {
        description: 'Together, we can provide light where it is needed most.',
        icon: faGlobeAfrica,
        link: '/medled/mission',
        title: 'Mission Trips',
      },
      {
        blank: true,
        title: '',
      },
    ],
  },
  {
    heading: 'Why Buy MedLED?',
    items: [
      {
        description: 'Our history of manufacturing state-of-the-art devices.',
        icon: faQuestionCircle,
        link: 'https://rpmed.com/pages/advantage',
        title: 'Why Buy MedLED®',
      },
      {
        description: 'MedLED® Chrome products vs the competition.',
        icon: faPoll,
        link: 'https://rpmed.com/pages/medled-vs-others',
        title: 'Comparison',
      },
      {
        blank: true,
        title: '',
      },
    ],
  },
  {
    heading: 'Literature',
    items: [
      {
        description: 'Brochure',
        icon: faFilePdf,
        link: '/d/medled',
        title: 'MedLED® Headlights',
      },
      {
        description: 'Brochure',
        icon: faFilePdf,
        link: '/d/medledcam',
        title: 'MedLED® Cameras',
      },
      {
        description: 'Brochure',
        icon: faFilePdf,
        link: '/d/medledmag',
        title: 'MedLED® Magnification',
      },
      {
        description: 'Brochure',
        icon: faFilePdf,
        link: '/d/medledstor',
        title: 'MedLED® Storage',
      },
      {
        description: 'For more information on face shield options.',
        icon: faFilePdf,
        link: '/d/medledface',
        title: 'MedLED® Face Shields',
      },
      {
        description: 'Brochure',
        icon: faFilePdf,
        link: '/d/medledpad',
        title: 'MedLED® Padding',
      },
    ],
  },
  {
    heading: 'Register',
    items: [
      {
        description: 'Take advantage of your MedLED® limited warranty.',
        icon: faFileCertificate,
        link: '/medled/register',
        title: 'Register',
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
  {
    heading: 'Partners',
    items: [
      {
        description:
          'Get an RGA # to service units on behalf of your customers.',
        icon: faTools,
        link: '/medled/rga',
        title: 'Request an RGA',
      },
    ],
  },
]

export default medledMenu
