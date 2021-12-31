import * as React from 'react'
import { Helmet } from 'react-helmet'
import { ContentMainHeading, GridNav, View } from 'rpmed-ui/lib/V1'
import { BreadCrumb } from 'rpmed-ui'
import ProductGrid from './ProductGrid'
import { IProductOption } from './products'
import SymptomList from './SymptomList'
import { useParams } from 'react-router-dom'
import { useFindPageWithSlugQuery } from 'rpmed-schema'

const { useState } = React

const TroubleshootingView: React.FC<{}> = () => {
  const [product, setProduct] = useState('')
  const [symptoms, setSymptoms] = useState([''])
  const { slug } = useParams<{ slug: string }>()
  const { data } = useFindPageWithSlugQuery({ variables: { slug } })

  const handleProductSelect = (selectedProduct: IProductOption) => {
    setProduct(selectedProduct.name)
  }

  const handleProductDeselect = () => {
    setProduct('')
    setSymptoms([''])
  }

  const handleSymptomSelect = (symptom: string) => {
    const update = symptoms.includes(symptom)
      ? symptoms.filter(s => s !== symptom)
      : [symptom, ...symptoms]
    setSymptoms(update)
  }

  const productSelected = product.length > 0

  return (
    <View>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MedLED® Troubleshooting - Riverpoint Medical</title>
      </Helmet>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: data?.pageBySlug.page?.title ?? '...', to: `/${slug}` },
          { label: 'Troubleshooting', to: `/${slug}/troubleshooting` },
        ]}
      />
      <ContentMainHeading>MedLED® Troubleshooting</ContentMainHeading>
      <GridNav.SectionTitle>Choose Your Product</GridNav.SectionTitle>
      <ProductGrid
        onProductSelect={handleProductSelect}
        onProductDeselected={handleProductDeselect}
        selectedProductName={product}
      />
      {productSelected ? (
        <GridNav.SectionTitle>Choose Your Symptom</GridNav.SectionTitle>
      ) : (
        <span />
      )}
      {productSelected ? (
        <SymptomList
          selectedProduct={product}
          selectedSymptoms={symptoms}
          onSelectSymptom={handleSymptomSelect}
        />
      ) : (
        <span />
      )}
    </View>
  )
}

export default TroubleshootingView
