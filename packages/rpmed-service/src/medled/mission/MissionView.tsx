import * as React from 'react'
import { ContactForm } from 'rpmed-ui'
import { useParams } from 'react-router-dom'
import { BreadCrumbFromPage } from '../../pages'
import { View, ContentMainHeading, TextFormContent } from 'rpmed-ui/lib/V1'

const MissionView: React.FC<{}> = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  return (
    <View>
      <BreadCrumbFromPage
        slug={slug}
        trail={[{ label: 'Mission Application', to: `/${slug}/mission` }]}
      />
      <ContentMainHeading>Apply for a MedLED Mission</ContentMainHeading>
      <TextFormContent>
        <p>
          Please reach out with any feedback or questions on our products and
          services.
        </p>
        <ContactForm onSubmit={async () => undefined} />
      </TextFormContent>
    </View>
  )
}
export default MissionView
