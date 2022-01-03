import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { GridNav, styled } from 'rpmed-ui/lib/V1'
import products, { IProductOption } from './products'

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  color: ${(p: any) => p.theme.colorButtonPrimary};
`

const ProductImage = styled.img`
  display: block;
  width: 3rem;
  height: auto;
`

type ProductSelectHandler = (product: IProductOption) => void

type ProductDeselectHandler = () => void

interface IProductGridProps {
  onProductSelect: ProductSelectHandler
  onProductDeselected: ProductDeselectHandler
  selectedProductName: string
}

const renderProducts = (onProductSelect: ProductSelectHandler) => {
  const handleProductSelect = (product: IProductOption) => (
    e: React.MouseEvent
  ) => {
    e.preventDefault()
    onProductSelect(product)
  }
  return products
    .sort((a, b) =>
      a.priority > b.priority ? -1 : a.priority < b.priority ? 1 : 0
    )
    .map((p: any) => (
      <GridNav.Item key={`ProductOption${p.name}`}>
        <GridNav.OverlayButton onClick={handleProductSelect(p)} />
        <GridNav.IconWrap>
          <ProductImage src={p.img} />
        </GridNav.IconWrap>
        <GridNav.ItemContent>
          <GridNav.ItemTitle>
            <GridNav.ItemLink to="/troubleshoot">{p.name}</GridNav.ItemLink>
          </GridNav.ItemTitle>
          <GridNav.ItemDescription>{p.description}</GridNav.ItemDescription>
        </GridNav.ItemContent>
      </GridNav.Item>
    ))
}

const renderSelectedProduct = (
  productName: string,
  onProductDeselected: ProductDeselectHandler
) => {
  const p = products.filter(product => product.name === productName)[0]
  return (
    <GridNav.Item selected={true}>
      <GridNav.OverlayButton onClick={onProductDeselected} />
      <GridNav.IconWrap>
        <ProductImage src={p.img} />
      </GridNav.IconWrap>
      <GridNav.ItemContent>
        <GridNav.ItemTitle>
          <GridNav.ItemLink to="/troubleshoot">{p.name}</GridNav.ItemLink>
        </GridNav.ItemTitle>
        <GridNav.ItemDescription>{p.description}</GridNav.ItemDescription>
      </GridNav.ItemContent>
      <CloseButton>
        <FontAwesomeIcon icon={faTimesCircle} size="sm" />
      </CloseButton>
    </GridNav.Item>
  )
}

const ProductGrid: React.FC<IProductGridProps> = ({
  onProductDeselected,
  onProductSelect,
  selectedProductName,
}) => {
  return (
    <GridNav.Container>
      {selectedProductName.length > 0
        ? renderSelectedProduct(selectedProductName, onProductDeselected)
        : renderProducts(onProductSelect)}
    </GridNav.Container>
  )
}

export default ProductGrid
