import {
  faExclamationSquare,
  faExclamationTriangle,
  faLightbulbOn,
  faMedkit,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { media, styled } from 'rpmed-ui'
import { symptoms } from './symptoms'

const SymptomView = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0 0 6px 0;
  background: ${(p: any) => p.theme.colorPrimary};
  border-radius: ${(p: any) => p.theme.borderRadius};
  color: ${(p: any) => p.theme.colorBodyTextInverted};
`

const SymptomHeadline = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`

const SymptomIcon = styled.div`
  margin: auto 10px auto 0;
  width: 1.5rem;
  display: flex;

  & > * {
    margin: auto;
  }
`

const SymptomName = styled.h3`
  font-size: 16px;
  margin: auto 0;
`

const SymptomDetail = styled.article`
  background: ${(p: any) => p.theme.colorContentAreaBackground};
  border: 1px solid ${(p: any) => p.theme.colorContentAreaBorder};
  border-radius: ${(p: any) => p.theme.borderRadius};
  cursor: pointer;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  padding: 12px;
  margin: 6px 0 0 0;
  max-width: 100%;
  transition: transform 0.2s ease-out, box-shadow 0.3s ease-out;
  position: relative;
  color: ${(p: any) => p.theme.colorBodyText};
  ${media.minSm`flex-direction: row;`}
`

const SymptomDetailList = styled.div`
  display: flex;
  flex-direction: column;
`

const SymptomDescription = styled.div`
  display: flex;
  flex-direction: row;
  margin: 6px 0;
`

const SymptomContent = styled.section`
  display: flex;
  flex-direction: column;
`

const SymptomContentHeading = styled.h3`
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
  font-size: 12px;
  color: ${(p: any) => p.theme.colorBodyHeader};
  margin: 0;
  padding: 0;
  line-height: 1em;
`

const SymptomContentIcon = styled.div`
  width: 4rem;
  max-width: 4rem;
  flex-basis: 4rem;
  margin: 0 10px auto 0;
  color: ${(p: any) => p.theme.colorPrimary};
  opacity: 0.75;
  flex-grow: 0;
  flex-shrink: 0;

  & > * {
    display: block;
    margin: auto;
  }
`
const Images = styled.div`
  display: flex;
  flex-direction: column;
  ${media.minSm`margin-left: auto; margin-right: 0;`}
`

const SymptomImage = styled.img`
  border-radius: ${(p: any) => p.theme.borderRadius};
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;

  ${media.minSm`
    margin: 0;
    width: 200px;
  `}

  & + & {
    margin-top: 10px;
  }
`

const SymptomContentText = styled.p`
  margin: 0;
`

const renderContent = (
  heading: string,
  icon: IconDefinition,
  content?: string
) =>
  content ? (
    <SymptomDescription>
      <SymptomContentIcon>
        <FontAwesomeIcon icon={icon} size="2x" />
      </SymptomContentIcon>
      <SymptomContent>
        <SymptomContentHeading>{heading}</SymptomContentHeading>
        <SymptomContentText>{content}</SymptomContentText>
      </SymptomContent>
    </SymptomDescription>
  ) : (
    <span />
  )

type SymptomSelectHandler = (symptomName: string) => void

interface ISymptomListProps {
  selectedProduct: string
  selectedSymptoms: string[]
  onSelectSymptom: SymptomSelectHandler
}

const SymptomList: React.FunctionComponent<ISymptomListProps> = ({
  selectedProduct,
  selectedSymptoms,
  onSelectSymptom,
}) => {
  const handleProductSelect = (symptom: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    onSelectSymptom(symptom)
  }

  return (
    <div>
      {symptoms
        .filter(s => s.applicableProducts.includes(selectedProduct))
        .map(s => (
          <SymptomView key={s.title}>
            <SymptomHeadline onClick={handleProductSelect(s.title)}>
              <SymptomIcon>
                <FontAwesomeIcon icon={s.icon} />
              </SymptomIcon>
              <SymptomName>{s.title}</SymptomName>
            </SymptomHeadline>
            {selectedSymptoms.includes(s.title) ? (
              <SymptomDetail>
                <SymptomDetailList>
                  {renderContent(
                    'Problem:',
                    faExclamationSquare,
                    s.description.problem
                  )}
                  {renderContent('Solution:', faMedkit, s.description.solution)}
                  {renderContent('Tip:', faLightbulbOn, s.description.tip)}
                  {renderContent(
                    'Message:',
                    faExclamationTriangle,
                    s.description.message
                  )}
                </SymptomDetailList>
                {s.images ? (
                  <Images>
                    {s.images.map(i => (
                      <SymptomImage src={i} key={i} />
                    ))}
                  </Images>
                ) : (
                  <span />
                )}
              </SymptomDetail>
            ) : (
              <span />
            )}
          </SymptomView>
        ))}
    </div>
  )
}

export default SymptomList
