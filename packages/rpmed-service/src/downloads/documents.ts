interface IDocument {
  id: string
  title: string
  description?: string
  tags: string[]
  url: string
}

export const documents: IDocument[] = [
  {
    id: 'gsutvt',
    title: 'Gut Suture (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB039-02+04-2015_IFU%2C+Gut+Suture+-+Vet+Use+Only.pdf',
  },
  // {
  //   id: 'vtoglu',
  //   title: 'Vet One Glue',
  //   tags: ['IFU', 'Vetrinary'],
  //   url:
  //     'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB052-04+06-2017+VETONE+GLUE.pdf',
  // },
  {
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/adhesives_brochure_web.pdf',
    title: 'Adhesive Brochure',
    id: 'adhesives',
    tags: ['Surgical'],
    description: 'For more information on Riverpoint Tissue Adhesive',
  },
  {
    title: 'PTFE Suture Brochure',
    id: 'ptfesut',
    description: 'For more information on Monotex® PTFE Surgical Suture',
    tags: ['Surgical'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/sutures_ptfe_brochure_web.pdf',
  },
  {
    id: 'oemsurfib',
    title: 'OEM Surgical Fibers & Devices Catalog',
    description: '',
    tags: ['Surgical'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/oem_brochure_web.pdf',
  },
  {
    id: 'oemsportmed',
    title: 'Sports Medicine Catalog',
    description: 'Brochure for Sports Med Fibers and Devices.',
    tags: ['Surgical'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/sports_medicine_brochure_web.pdf',
  },
  {
    id: 'orthocl',
    tags: ['Surgical'],
    title: 'Orthobutton CL Brochure',
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/sports_medicine_orthobutton_brochure_web.pdf',
    description: 'Brochure for Closed Suture Loop',
  },
  {
    id: 'orthoal',
    tags: ['Surgical'],
    title: 'Orthobutton AL Brochure',
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/sports_medicine_triloc_brochure_web.pdf',
    description: 'Brochure for Triloc Self-Latching Adjustable Button Loop',
  },
  {
    id: 'suturecat',
    title: 'Suture Catalog',
    tags: ['Surgical'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/sutures_all_catalog_web.pdf',
    description: 'General Catalog, Surgical Sutures, Devices, Glue & Staplers',
  },
  {
    description:
      'For more information on Riverpoint Brachytherapy Needles & Devices.',
    id: 'oncology',
    tags: ['Surgical'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/oncology_brochure_web.pdf',
    title: 'Oncology Catalog',
  },
  {
    title: 'Skin Stapler Brochure',
    id: 'stapler',
    tags: ['Surgical'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/stapler_brochure_web.pdf',
    description: 'For more information on Riverpoint Skin Staplers',
  },
  {
    id: 'needlechart',
    description: 'Product sizing and exact measurement details.',
    tags: ['Surgical'],
    url:
      'https://s3-us-west-2.amazonaws.com/rpmed-web-assets/brochures/needle_chart_web.pdf',
    title: 'Needle Chart',
  },
  {
    id: 'sutureabs',
    description:
      'A detailed comparison of tensile strength across our product families.',
    tags: ['Surgical'],
    url:
      'https://s3-us-west-2.amazonaws.com/rpmed-web-assets/brochures/suture_nonabsorbable_absorption_chart_web.pdf',
    title: 'Suture Absorption',
  },
  {
    description: 'Brochure',
    tags: ['Surgical'],
    url:
      'https://s3-us-west-2.amazonaws.com/rpmed-web-assets/brochures/medled_brochure_web.pdf',
    id: 'medled',
    title: 'MedLED® Headlights',
  },
  {
    description: 'Brochure',
    tags: ['Surgical'],
    url:
      'https://s3-us-west-2.amazonaws.com/rpmed-web-assets/brochures/medled_live_brochure_web.pdf',
    id: 'medledcam',
    title: 'MedLED® Cameras',
  },
  {
    description: 'Brochure',
    tags: ['Surgical'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/medled_magnifier_guide_web.pdf',
    id: 'medledmag',
    title: 'MedLED® Magnification',
  },
  {
    description: 'Brochure',
    tags: ['Surgical'],
    url:
      'https://s3-us-west-2.amazonaws.com/rpmed-web-assets/brochures/medled_storage_brochure_web.pdf',
    id: 'medledstor',
    title: 'MedLED® Storage',
  },
  {
    description: 'For more information on face shield options.',
    tags: ['Surgical'],
    url:
      'https://s3-us-west-2.amazonaws.com/rpmed-web-assets/brochures/medled_faceshield_brochure_web.pdf',
    id: 'medledface',
    title: 'MedLED® Face Shields',
  },
  {
    description: 'Brochure',
    tags: ['Surgical'],
    url:
      'https://s3-us-west-2.amazonaws.com/rpmed-web-assets/brochures/medled_padding_guide_web.pdf',
    id: 'medledpad',
    title: 'MedLED® Padding',
  },
  {
    id: 'cobrablack',
    tags: ['Surgical'],
    description:
      'Enhances visibility, especially in blood & smaller surgery sites.',
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/needle_cobra_black_brochure_web.pdf',
    title: 'CobraBlack® Needles',
  },
  {
    id: 'sutadh',
    title: 'Surgical Adhesive (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB078-03+08-2016+RP-Surgical+ADHESIVE+IFU+PRINT+FILE+FOR+PRINT.pdf',
  },
  {
    id: 'pglain',
    title: 'PGLA PLA Plus Insert (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB082-01+PGLA+PGA+plus+insert+print+file.pdf',
  },
  {
    id: 'pdovet',
    title: 'PDO (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB150-01+07-2013+PDO+VET+ONLY+IFU+FOR+PRINT.pdf',
  },
  {
    id: 'pglavt',
    title: 'PGLA (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB151-01+07-2013+PGLA+VET+ONLY+IFU+PRINT+FILE.pdf',
  },
  {
    id: 'pgclvt',
    title: 'PGCL (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB152-01+07-2013+PGCL+VET+ONLY+IFU+PRINT+FILE.pdf',
  },
  {
    id: 'nylvet',
    title: 'Nylon (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB153-02+11-2015+NYLON+VET+ONLY+IFU+PRINT+FILE.pdf',
  },
  {
    id: 'polpvt',
    title: 'Polypropylene (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB154-01+07-2013+POLYPROPYLENE+VET+ONLY+IFU.pdf',
  },
  {
    id: 'florvt',
    title: 'Flourescenet (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB155-01+07-2013+FLUORESCENT+(PINK_GREEN+PP)+VET+ONLY+IFU+PRINT+FILE.pdf',
  },
  // {
  //   id: 'patter',
  //   title: 'Patterson Veterinary WebGlue Surgical Adhesive Webster',
  //   tags: ['IFU', 'Vetrinary'],
  //   url:
  //     'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB156-03+08-2017+Patterson+Veterinary+WebGlue+Surgical+Adhesive+Webster+FOR+PRINT.ai',
  // },
  {
    id: 'pgavet',
    title: 'PGA (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB157-01+10-2013_IFU%2C+PGA-+VET+USE+ONLY+print+file.pdf',
  },
  {
    id: 'pdopcs',
    title: 'PDO Plus Cassette (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB162+01-2014+PDO+PLUS+Cassette+IFU.pdf',
  },
  {
    id: 'pgaqvt',
    title: 'PGA Quick (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB182-02+02-2015+PGA+QUICK+VET+USE+ONLY+insert+print+file.pdf',
  },
  {
    id: 'silkvt',
    title: 'Silk Suture (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB184-01+07-2014+SILK+suture+IFU+VET+Print+File.pdf',
  },
  {
    id: 'hsfibr',
    title: 'HS Fiber (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB187-02+10-2019+HS+Fiber+VET+USE+ONLY+FOR+PRINT.pdf',
  },
  {
    id: 'pdopls',
    title: 'PDO Plus Swage (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB196-01+01-2015+PDO+PLUS+SWAGE+IFU+2+PAGE+PRINT+FILE.pdf',
  },
  {
    id: 'pglcpc',
    title: 'PGCL Plus Cassette (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB197-01+01-2015+PGCL+PLUS+CASSETTE+IFU+PRINT+FILE.pdf',
  },
  {
    id: 'pglapc',
    title: 'PGLA Plus Cassette (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB104-02+03-2013+PGLA+PLUS+Cassette+IFU.pdf',
  },
  {
    id: 'pgclps',
    title: 'PGCL Plus Swage (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB198-01+01-2015+PGCL+PLUS+SWAGE+IFU+PRINT+FILE.pdf',
  },
  {
    id: 'polyvt',
    title: 'Polyester (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB204-01+03-2015+POLYESTER+VET+USE+ONLY+insert+print+file.pdf',
  },
  {
    id: 'brbpdo',
    title: 'Barbed PDO (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB243-01+03-2016+Barbed+PDO+FOR+PRINT.pdf',
  },
  {
    id: 'rpstapler',
    title: 'Riverpoint Stapler (Vet Only)',
    description: 'Click here for more information',
    tags: ['IFU', 'Vetrinary'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/ifus/PUB249-02_07-2018_RP_Stapler_brochure.pdf',
  },
  {
    id: 'procinchopen',
    title: 'ProCinch Open Loop',
    description: 'Surgical Reference Guide',
    tags: ['Stryker'],
    url:
      'https://rpmed-web-assets.s3-us-west-2.amazonaws.com/brochures/pro_cinch_loop.pdf',
  },
  {
    id: 'juggerknot',
    title: 'Australia Patient Info',
    description: 'Click here for more information',
    tags: ['ZimmerBiomet'],
    url:
      'https://rpmed-web-assets.s3.us-west-2.amazonaws.com/brochures/PUB426-01+06-2021+Zimmer+Biomet+Patient+Leaflet+%26+Implant+Card.pdf',
  },
]
