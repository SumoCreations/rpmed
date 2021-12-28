import {
  faAdjust,
  faBatteryBolt,
  faBatteryEmpty,
  faBatterySlash,
  faExclamationTriangle,
  faHeadVr,
  faLightbulbExclamation,
  faLightbulbSlash,
  IconDefinition,
} from '@fortawesome/pro-solid-svg-icons'

import ImgBlink1 from './img/symptom_blinks_1.png'
import ImgBlink2 from './img/symptom_blinks_2.png'
import ImgSpot from './img/symptom_spot_1.png'

enum SymptomFee {
  Yes,
  No,
  NotApplicable,
}

interface ISymptomDescription {
  problem?: string
  solution?: string
  tip?: string
  message?: string
}

export interface ISymptom {
  applicableProducts: string[]
  title: string
  description: ISymptomDescription
  faultCode: string
  fee: SymptomFee
  picture?: string
  icon: IconDefinition
  images?: string[]
}

export const symptoms: ISymptom[] = [
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem:
        'LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.',
      solution:
        'Replace light housing module because it needs a new wire harness and/or circuit boards.',
      tip: 'Improper cleaning can result in damage (see Cleaning Guide)',
    },
    faultCode: 'EHIJ',
    fee: SymptomFee.Yes,
    icon: faLightbulbSlash,
    images: [ImgBlink1, ImgBlink2],
    title: 'Light randomly turns off (stobes/blinks)',
  },
  {
    applicableProducts: ['MedLED Sapphire®'],
    description: {
      problem: 'Metal light housing piece (silver rivet) wear and tear.',
      solution: 'Replace headlight unit which includes new adjustment post.',
    },
    faultCode: 'A',
    fee: SymptomFee.No,
    icon: faAdjust,
    images: [ImgSpot],
    title: 'Broken spot size adjustment post',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem:
        "Battery contacts on circuit board(s) broken or bent so they don't power the light.",
      solution: 'Replace headstrap module.',
    },
    faultCode: 'B',
    fee: SymptomFee.Yes,
    icon: faBatterySlash,
    title: 'Broken battery contacts',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem: 'Batteries are past expected lifetime.',
      solution: 'Replace with new batteries and recycle old batteries.',
      tip:
        'Batteries should be replaced at least once per year. Do not mix old batteries with new batteries.',
    },
    faultCode: 'L',
    fee: SymptomFee.NotApplicable,
    icon: faBatteryEmpty,
    title: "Batteries aren't lasting long",
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem: 'Retention clip that holds the rheostat knob wear and tear.',
      solution: 'Replace headstrap module.',
    },
    faultCode: 'C',
    fee: SymptomFee.No,
    icon: faLightbulbExclamation,
    title: 'Broken rheostat brightness knob',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem:
        'Some dust, dirt, and/or debris got stuck within the optics column, or, a lens is loose in the housing causing the light to be dim or beam to be dirty.',
      solution: 'Replace bezel light housing module.',
      tip: 'Improper cleaning can result in damage (see Cleaning Guide)',
    },
    faultCode: 'D',
    fee: SymptomFee.No,
    icon: faLightbulbExclamation,
    title: 'Beam is dim and/or dirty',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem: 'USB charging port broke from the circuit board.',
      solution: 'Replace headstrap module.',
    },
    faultCode: 'F',
    fee: SymptomFee.Yes,
    icon: faBatteryBolt,
    title: 'Broken charging port (USB)',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem:
        'Black c-shape portion that slides up and down (connecting the bezel light to the headstrap post) broke or cracked.',
      solution: 'Replace bezel light housing module.',
    },
    faultCode: 'G',
    fee: SymptomFee.No,
    icon: faLightbulbExclamation,
    title: 'Broken bracket on light',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem:
        "Indicator LED's are giving an error code (red or flashing color) or are not illuminated when the charger cable is plugged in. This could mean that the batteries aren't functional or past their life expectancy or that the charger wall plug or USB cable is broken.",
      solution: 'Replace headstrap module and batteries.',
      tip:
        'Batteries should be replaced at least once per year. Do not mix old batteries with new batteries. Also, do not charge with an unauthorized charger.',
    },
    faultCode: 'G',
    fee: SymptomFee.NotApplicable,
    icon: faBatteryBolt,
    title: "Batteries aren't charging",
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem: 'Padding or adhesive/velcro is worn.',
      solution: 'Replace padding.',
      tip: 'Padding should be replaced often.',
    },
    faultCode: 'K',
    fee: SymptomFee.NotApplicable,
    icon: faExclamationTriangle,
    title: 'Padding wearing down or falling off',
  },
  {
    applicableProducts: [
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem:
        'USB charger or bezel plug doesn’t stay in and fits too loosely and light is malfunctioning.',
      solution: 'Replace bezel light housing module.',
    },
    faultCode: 'F',
    fee: SymptomFee.Yes,
    icon: faExclamationTriangle,
    title: 'Charger port is loose',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem: 'Headband has some discomfort.',
      solution:
        'Replace with different padding or demo another headlight system.',
      tip:
        'Check for new headlights as we are always finding new ways to make our products more comfortable.',
    },
    faultCode: 'K',
    fee: SymptomFee.NotApplicable,
    icon: faHeadVr,
    title: 'Light not comfortable',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem: 'Bezel cracked and broken.',
      solution: 'Replace bezel light housing module.',
    },
    faultCode: 'K',
    fee: SymptomFee.No,
    icon: faHeadVr,
    title: 'Broken headband',
  },
  {
    applicableProducts: [
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
    ],
    description: {
      problem: "Beam isn't steady during normal operation.",
      solution: 'Obtain a headband stabilizer kit.',
    },
    faultCode: 'K',
    fee: SymptomFee.No,
    icon: faLightbulbExclamation,
    title: 'Beam is bouncing',
  },
  {
    applicableProducts: [
      'MedLED Onyx®',
      'MedLED Sapphire®',
      'MedLED Chrome® MC3',
      'MedLED Chrome® MC6',
      'MedLED Chrome® MC7',
      '4-Bay Charging Dock',
    ],
    description: {
      problem:
        "No light coming out of the beam when light is turned on. The indicator LED's are not illuminated when charging or powered on and the wiring may be damaged.",
      solution: 'Replace headstrap module.',
    },
    faultCode: 'K',
    fee: SymptomFee.Yes,
    icon: faLightbulbSlash,
    title: 'Light not turning on',
  },
  {
    applicableProducts: ['4-Bay Charging Dock'],
    description: {
      problem:
        "USB charger or bezel plug doesn’t stay in and fits too loosely. Try purchasing a new charger. If that doesn't work, send in for servicing.",
      solution: 'Replace module.',
    },
    faultCode: '',
    fee: SymptomFee.NotApplicable,
    icon: faExclamationTriangle,
    title: 'Charger port is loose',
  },
  {
    applicableProducts: ['4-Bay Charging Dock'],
    description: {
      problem:
        "Indicator LED's are giving an error code (red or flashing color) or are not illuminated when the charger cable is plugged in. This could mean that the batteries aren't functional or past their life expectancy or that the charger wall plug or USB cable is broken.",
      solution: 'Replace charger module and batteries.',
      tip:
        'Batteries should be replaced at least once per year. Do not mix old batteries with new batteries. Also, do not charge with an unauthorized charger.',
    },
    faultCode: '',
    fee: SymptomFee.NotApplicable,
    icon: faBatterySlash,
    title: "Batteries aren't charging",
  },
  {
    applicableProducts: ['MedLED Focus®'],
    description: {
      message:
        'This product has been discontinued. Please contact us below for what you can do. It may be possible that you qualify for our Trade Up program and get credit for what you have.',
    },
    faultCode: 'N/A',
    fee: SymptomFee.NotApplicable,
    icon: faExclamationTriangle,
    title: 'This product has been discontinued.',
  },
  {
    applicableProducts: ['MedLED Hyperlite®'],
    description: {
      message:
        'This product has been discontinued. Please contact us below for what you can do. It may be possible that you qualify for our Trade Up program and get credit for what you have.',
    },
    faultCode: 'N/A',
    fee: SymptomFee.NotApplicable,
    icon: faExclamationTriangle,
    title: 'This product has been discontinued.',
  },
  {
    applicableProducts: ['Other'],
    description: {
      message:
        'Please contact us below for what you can do. It may be possible that you qualify for our Trade Up program and get credit for what you have.',
    },
    faultCode: 'N/A',
    fee: SymptomFee.NotApplicable,
    icon: faExclamationTriangle,
    title: 'This product may have been discontinued.',
  },
  {
    applicableProducts: ['MedLED Classic™'],
    description: {
      message: 'Please purchase a new headlight.',
    },
    faultCode: 'N/A',
    fee: SymptomFee.NotApplicable,
    icon: faExclamationTriangle,
    title: 'Please purchase a new headlight.',
  },
]
