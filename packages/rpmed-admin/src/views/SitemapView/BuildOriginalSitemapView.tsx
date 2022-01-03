import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { useNavigate } from 'react-router-dom'
import { useMakePageMutation } from 'rpmed-schema'
import { kebabCase } from 'lodash'
import uuid from 'uuid'
import { useState } from 'react'
import { useEffect } from 'react'
import { wait } from 'utils'

const sitemap = [
  {
    title: 'Resource Center',
    sections: [
      {
        name: 'Support',
        items: [
          {
            description:
              'For more information and support on Fibers & Devices.',
            icon: 'faInfoCircle',
            target: '/surgical',
            name: 'Surgical Fibers & Devices',
          },
          {
            description: 'For more information and support on Wound Closure',
            icon: 'faInfoCircle',
            target: '/suture',
            name: 'Sutures',
          },
          {
            description: 'For more information on MedLED Products',
            icon: 'faInfoCircle',
            target: '/medled',
            name: 'MedLED®',
          },
          {
            description:
              'For more information on Brachytherapy Needles & Devices',
            icon: 'faInfoCircle',
            target: '/oncology',
            name: 'Oncology',
          },
        ],
      },
    ],
  },
  {
    title: 'MedLed',
    sections: [
      {
        name: 'Service Your MedLED',
        items: [
          {
            description: "48-Hour Turnaround with MedLED's Signature Service.",
            icon: 'faAmbulance',
            target: 'service-request',
            type: 'tool',
            name: 'Service My Headlight',
          },
          {
            description:
              'Find common problems &amp; solutions to your product.',
            icon: 'faTools',
            target: 'troubleshooting',
            type: 'tool',
            name: 'Troubleshoot',
          },
          {
            description:
              'Get new batteries at no charge using our recycling program.',
            icon: 'faBatteryQuarter',
            target: 'batteries',
            type: 'tool',
            name: 'Battery Recycling',
          },
        ],
      },
      {
        name: 'Get a MedLED',
        items: [
          {
            description:
              'Learn how to buy a Headlight or get a free trial & quote.',
            icon: 'faFileInvoiceDollar',
            target: 'quote',
            type: 'tool',
            name: 'Request a Quote',
          },
          {
            description:
              'Together, we can provide light where it is needed most.',
            icon: 'faGlobeAfrica',
            target: 'mission',
            type: 'tool',
            name: 'Mission Trips',
          },
        ],
      },
      {
        name: 'Why Buy MedLED?',
        items: [
          {
            description:
              'Our history of manufacturing state-of-the-art devices.',
            icon: 'faQuestionCircle',
            target: 'https://rpmed.com/pages/advantage',
            name: 'Why Buy MedLED®',
            type: 'url',
          },
          {
            description: 'MedLED® Chrome products vs the competition.',
            icon: 'faPoll',
            target: 'https://rpmed.com/pages/medled-vs-others',
            name: 'Comparison',
            type: 'url',
          },
        ],
      },
      {
        name: 'Literature',
        items: [
          {
            description: 'Brochure',
            icon: 'faFilePdf',
            target: 'medled',
            type: 'document',
            name: 'MedLED® Headlights',
          },
          {
            description: 'Brochure',
            icon: 'faFilePdf',
            target: 'medledcam',
            type: 'document',
            name: 'MedLED® Cameras',
          },
          {
            description: 'Brochure',
            icon: 'faFilePdf',
            target: 'medledmag',
            type: 'document',
            name: 'MedLED® Magnification',
          },
          {
            description: 'Brochure',
            icon: 'faFilePdf',
            target: 'medledstor',
            type: 'document',
            name: 'MedLED® Storage',
          },
          {
            description: 'For more information on face shield options.',
            icon: 'faFilePdf',
            target: 'medledface',
            type: 'document',
            name: 'MedLED® Face Shields',
          },
          {
            description: 'Brochure',
            icon: 'faFilePdf',
            target: 'medledpad',
            type: 'document',
            name: 'MedLED® Padding',
          },
        ],
      },
      {
        name: 'Register',
        items: [
          {
            description: 'Take advantage of your MedLED® limited warranty.',
            icon: 'faFileCertificate',
            target: 'register',
            type: 'tool',
            name: 'Register',
          },
        ],
      },
      {
        name: 'Contact',
        items: [
          {
            description: 'Please reach out with any feedback or questions.',
            icon: 'faCommentsAlt',
            target: 'contact',
            type: 'tool',
            name: 'Contact Us',
          },
          {
            description: 'Take a Look at our MedLED® Champions',
            icon: 'faCommentSmile',
            target: 'https://rpmed.com/pages/testimonials',
            type: 'url',
            name: 'Testimonials',
          },
        ],
      },
      {
        name: 'Partners',
        items: [
          {
            description:
              'Get an RGA # to service units on behalf of your customers.',
            icon: 'faTools',
            target: 'rga',
            name: 'Request an RGA',
            type: 'tool',
          },
        ],
      },
    ],
  },
  {
    title: 'Oncology',
    sections: [
      {
        name: 'Service',
        items: [
          {
            description:
              'Learn how to buy a Headlight or get a free trial & quote.',
            icon: 'faFileInvoiceDollar',
            target: 'quote',
            type: 'tool',
            name: 'Request a Quote',
          },
        ],
      },
      {
        name: 'Literature (Sales)',
        items: [
          {
            description:
              'For more information on Riverpoint Brachytherapy Needles & Devices.',
            icon: 'faFilePdf',
            target: 'oncology',
            name: 'Oncology Catalog',
            type: 'document',
          },
        ],
      },
      {
        name: 'Contact',
        items: [
          {
            description: 'Please reach out with any feedback or questions.',
            icon: 'faCommentsAlt',
            target: 'contact',
            name: 'Contact Us',
            type: 'tool',
          },
          {
            description: 'Take a Look at our MedLED® Champions',
            icon: 'faCommentSmile',
            target: 'https://rpmed.com/pages/testimonials',
            name: 'Testimonials',
            type: 'url',
          },
        ],
      },
    ],
  },
  {
    title: 'Surgical',
    sections: [
      {
        name: 'Service',
        items: [
          {
            description:
              'Learn how to buy a Headlight or get a free trial & quote.',
            icon: 'faFileInvoiceDollar',
            type: 'tool',
            target: 'quote',
            name: 'Request a Quote',
          },
        ],
      },
      {
        name: 'Literature (Sales)',
        items: [
          {
            description:
              'Brochure for OEM Sutures, Tapes, Loops, Needles, Anchors & More.',
            icon: 'faFilePdf',
            type: 'document',
            target: 'oemsurfib',
            name: 'OEM Surgical Fibers & Devices Catalog',
          },
          {
            description: 'Brochure for Sports Med Fibers and Devices.',
            icon: 'faFilePdf',
            type: 'document',
            target: 'oemsportmed',
            name: 'Sports Medicine Catalog',
          },
          {
            description: 'Brochure for Closed Suture Loop',
            icon: 'faFilePdf',
            type: 'document',
            target: 'orthocl',
            name: 'Orthobutton CL Brochure',
          },
          {
            name: 'Orthobutton AL Brochure',
            icon: 'faFilePdf',
            type: 'document',
            target: 'orthoal',
            description:
              'Brochure for Triloc Self-Latching Adjustable Button Loop',
          },
          {
            name: 'Suture Catalog',
            icon: 'faFilePdf',
            type: 'document',
            target: 'suturecat',
            description:
              'General Catalog, Surgical Sutures, Devices, Glue & Staplers',
          },
        ],
      },
      {
        name: 'Literature (Technical)',
        items: [
          {
            description: 'Product sizing and exact measurement details.',
            icon: 'faRulerTriangle',
            type: 'document',
            target: 'needlechart',
            name: 'Needle Chart',
          },
          {
            description:
              'A detailed comparison of tensile strength across our product families.',
            icon: 'faHandHoldingWater',
            type: 'document',
            target: 'sutureabs',
            name: 'Suture Absorption',
          },
          {
            description:
              'Enhances visibility, especially in blood & smaller surgery sites.',
            icon: 'faSnake',
            type: 'document',
            target: 'cobrablack',
            name: 'CobraBlack® Needles',
          },
        ],
      },
      {
        name: 'Contact',
        items: [
          {
            description: 'Please reach out with any feedback or questions.',
            icon: 'faCommentsAlt',
            type: 'tool',
            target: 'contact',
            name: 'Contact Us',
          },
          {
            description: 'Take a Look at our MedLED® Champions',
            icon: 'faCommentSmile',
            type: 'url',
            target: 'https://rpmed.com/pages/testimonials',
            name: 'Testimonials',
          },
        ],
      },
    ],
  },
  {
    title: 'Suture',
    sections: [
      {
        name: 'Service',
        items: [
          {
            description:
              'Learn how to buy a Headlight or get a free trial & quote.',
            icon: 'faFileInvoiceDollar',
            type: 'tool',
            target: 'quote',
            name: 'Request a Quote',
          },
        ],
      },
      {
        name: 'Literature (Sales)',
        items: [
          {
            name: 'Suture Catalog',
            icon: 'faFilePdf',
            type: 'document',
            target: 'suturecat',
            description: 'Brochure on Wound Closure Products',
          },
          {
            name: 'PTFE Suture Brochure',
            icon: 'faFilePdf',
            type: 'document',
            target: 'ptfesut',
            description:
              'For more information on Monotex® PTFE Surgical Suture',
          },
          {
            name: 'Adhesive Brochure',
            icon: 'faFilePdf',
            type: 'document',
            target: 'adhesives',
            description: 'For more information on Riverpoint Tissue Adhesive',
          },
          {
            name: 'Skin Stapler Brochure',
            icon: 'faFilePdf',
            type: 'document',
            target: 'stapler',
            description: 'For more information on Riverpoint Skin Staplers',
          },
          {
            description:
              'Brochure for OEM Sutures, Tapes, Loops, Needles, Anchors & More.',
            icon: 'faFilePdf',
            type: 'document',
            target: 'oemsurfib',
            name: 'OEM Surgical Fibers & Devices Catalog',
          },
        ],
      },
      {
        name: 'Literature (Technical)',
        items: [
          {
            description: 'Product sizing and exact measurement details.',
            icon: 'faRulerTriangle',
            type: 'document',
            target: 'needlechart',
            name: 'Needle Chart',
          },
          {
            description:
              'A detailed comparison of tensile strength across our product families.',
            icon: 'faHandHoldingWater',
            type: 'document',
            target: 'sutureabs',
            name: 'Suture Absorption',
          },
          {
            description:
              'Enhances visibility, especially in blood & smaller surgery sites.',
            icon: 'faSnake',
            type: 'document',
            target: 'cobrablack',
            name: 'CobraBlack® Needles',
          },
        ],
      },
      {
        name: 'Contact',
        items: [
          {
            description: 'Please reach out with any feedback or questions.',
            icon: 'faCommentsAlt',
            type: 'tool',
            target: 'contact',
            name: 'Contact Us',
          },
          {
            description: 'Take a Look at our MedLED® Champions',
            icon: 'faCommentSmile',
            type: 'url',
            target: 'https://rpmed.com/pages/testimonials',
            name: 'Testimonials',
          },
        ],
      },
    ],
  },
]

export const BuildOriginalSitemapView: React.FC = () => {
  const navigate = useNavigate()
  const [makePageMutation] = useMakePageMutation()
  const handleBack = () => {
    navigate('/admin/sitemap/pages')
  }
  const [currentPage, setCurrentPage] = useState(0)
  const [pendingPageIndex, setPendingPageIndex] = useState(-1)
  useEffect(() => {
    if (currentPage < sitemap.length && currentPage !== pendingPageIndex) {
      setPendingPageIndex(currentPage)
      const makePage = async () => {
        const pageInput = {
          id: uuid(),
          title: sitemap[currentPage].title,
          slug: kebabCase(sitemap[currentPage].title),
          sections: (sitemap[currentPage].sections as any).map(
            (s: any, i: number) => ({
              ...s,
              id: uuid(),
              position: i,
              items: s.items.map((i: any, ii: number) => ({
                ...i,
                id: uuid(),
                position: ii,
              })),
            })
          ),
        }
        console.log(pageInput)
        await wait(2)
        await makePageMutation({
          variables: {
            pageInput,
          },
        })
        setCurrentPage(currentPage + 1)
      }
      makePage()
    }
  }, [
    currentPage,
    setCurrentPage,
    pendingPageIndex,
    setPendingPageIndex,
    makePageMutation,
  ])

  return (
    <Layout.Layout>
      <Helmet title={`Importing Sitemap - RPMed Service Admin`} />
      <Content>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <h2 className="text-sm font-bold">Building Sitemap:</h2>
          {sitemap.map((page, index) => (
            <p key={`${page.title}${index}`}>
              <span className="text-sm font-bold">{page.title}</span>
              {index > currentPage ? (
                <span className="text-sm text-gray-300">pending</span>
              ) : (
                ''
              )}
            </p>
          ))}
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
