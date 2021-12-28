import * as React from 'react'
import { Helmet } from 'react-helmet'
import { BreadCrumb, ContentMainHeading, GridNav, View } from 'rpmed-ui'
import ProductGrid from './ProductGrid'
import { IProductOption } from './products'
import SymptomList from './SymptomList'

const { useState } = React

const TroubleshootingView: React.FunctionComponent<{}> = () => {
  const [product, setProduct] = useState('')
  const [symptoms, setSymptoms] = useState([''])

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
      <BreadCrumb.Container>
        <BreadCrumb.Link to="/medled/troubleshooting" primary={true}>
          Troubleshooting
        </BreadCrumb.Link>
      </BreadCrumb.Container>
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
