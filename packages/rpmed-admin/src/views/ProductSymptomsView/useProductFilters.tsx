import { Formik } from 'formik'
import React, { useState } from 'react'
import { ProductSymptom, ProductType } from 'rpmed-schema'
import { Grid } from 'rpmed-ui/lib/V1'
import { useProductSymptomsQuery } from 'rpmed-schema'
import {
  ModelNumberSelectField,
  ModelNumberSelectFn,
  ProductSelectField,
  ProductSelectFn,
  ProductTypeSelectField,
  ProductTypeSelectFn,
} from '../ProductRegistryView'

interface IFilterState {
  productId?: string | null
  productName?: string | null
  modelNumber?: string | null
  productType?: ProductType | null
}

export const useProductFilters = ({ searchText }: { searchText?: string }) => {
  const [filters, setFilters] = useState({} as IFilterState)

  const { data, ...query } = useProductSymptomsQuery({
    variables: {
      modelNumber: filters.modelNumber || '',
      search: searchText || '',
    }
  })
  const productSymptoms = data?.response.productSymptoms
  const pageSize = data?.response.pageSize ?? 0

  const handleSelectProduct: ProductSelectFn = p => {
    setFilters({
      ...filters,
      modelNumber: null,
      productId: p.id,
      productName: p.name,
    })
  }

  const handleSelectProductType: ProductTypeSelectFn = pt => {
    setFilters({ ...filters, productType: pt, modelNumber: null })
  }

  const handleSelectModel: ModelNumberSelectFn = m => {
    setFilters({ ...filters, modelNumber: m.id })
  }

  const handleSubmit = () => {
    return
  }

  const ProductFilters: React.FC = () => (
    <Formik
      initialValues={{ productType: '', productName: '' }}
      onSubmit={handleSubmit}
    >
      {() => (
        <React.Fragment>
          <Grid.Col span={4}>
            <ProductTypeSelectField
              onSelect={handleSelectProductType}
              value={filters.productType || ''}
              placeholder="Filter by Type"
              name="productType"
              margin="0 0 1rem 0"
              height="auto"
              clearable="All Types"
              searchable={false}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <ProductSelectField
              onSelect={handleSelectProduct}
              value={filters.productName || ''}
              placeholder="Filter by Product"
              name="productName"
              margin="0 0 1rem 0"
              height="auto"
              clearable="All Products"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <ModelNumberSelectField
              onSelect={handleSelectModel}
              value={filters.modelNumber || 'All Models'}
              productType={filters.productType}
              productId={filters.productId}
              placeholder="Filter by Product"
              name="model"
              margin="0 0 1rem 0"
              height="auto"
              clearable="All Models"
              primary={true}
            />
          </Grid.Col>
        </React.Fragment>
      )}
    </Formik>
  )

  const nrml = (s: string) => s.trim().toLowerCase()
  const sortByDescription = (a: ProductSymptom, b: ProductSymptom) =>
    nrml(a.name) > nrml(b.name) ? 1 : nrml(a.name) < nrml(b.name) ? -1 : 0

  const filterProductSymptom = ({ name, faultCode, id }: ProductSymptom) =>
    searchText && searchText.length > 0
      ? [id, name, faultCode]
        .map(
          val =>
            val && val.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
        )
        .includes(true)
      : true

  const filteredSymptoms = ((productSymptoms || []) as ProductSymptom[])
    .map(p => p as ProductSymptom)
    .sort(sortByDescription)
    .filter(filterProductSymptom)

  return {
    filters,
    productSymptoms: filteredSymptoms,
    ProductFilters,
    pageSize,
    ...query,
  }
}
