import React, { useRef, useEffect, useCallback } from 'react'
import { IconButton, OnSortCallback, Sortable } from 'rpmed-ui'
import {
  faPlus,
  faTrash,
  faChevronCircleUp,
  faChevronCircleDown,
} from '@fortawesome/pro-regular-svg-icons'
import { Context } from 'immutability-helper'
import { Section, SectionItem as SectionItemType } from './types'
import { SectionItem } from './SectionItem'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEqual } from 'lodash'

const { update } = new Context()

export interface SectionProps extends Section {
  onDelete?: () => void
  onNameChange?: (name: string) => void
  onPositionChange?: (currentPosition: number, newPosition: number) => void
  items: SectionItemType[]
  onItemsChanged: (sectionUuid: string, items: SectionItemType[]) => void
}

export const SectionDetail: React.FC<SectionProps> = ({
  id,
  name,
  position,
  items: externalItems,
  onDelete: handleDelete,
  onNameChange: handleNameChange,
  onPositionChange: handlePositionChange,
  onItemsChanged: handleItemsChanged,
}) => {
  const [items, setItems] = React.useState<SectionItemType[]>([
    ...externalItems,
  ])
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: '',
        position: items.length,
        id: uuidv4(),
        target: '',
        type: 'url',
        description: '',
        icon: 'faFileAlt',
      },
    ])
  }

  const handleRemoveSection = () => {
    handleDelete?.()
  }

  const [focused, setFocus] = React.useState(false)
  const inputEl = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (!focused) {
      setFocus(true)
      inputEl.current?.focus()
    }
  }, [focused, setFocus])

  const onSort: OnSortCallback = useCallback(
    (_, dragIndex, hoverIndex) => {
      const dragCard = items[dragIndex]
      setItems(
        update(items, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
          .map((i, index) => ({ ...i, position: index }))
          .sort((a, b) => a.position - b.position)
      )
    },
    [items, setItems]
  )

  const onFinishSort = useCallback(() => console.log('finish sort', items), [
    items,
  ])

  const handlePositionClick = (currentPos: number, newPos: number) => () => {
    handlePositionChange?.(currentPos, newPos)
  }

  const handleChangedItem = useCallback(
    (item: SectionItemType) => {
      if (
        !isEqual(
          item,
          items.find(i => i.id === item.id)
        )
      ) {
        setItems(items.map(i => (i.id === item.id ? item : i)))
      }
    },
    [setItems, items]
  )

  useEffect(() => {
    if (!isEqual(items, externalItems)) {
      handleItemsChanged?.(id, items)
    }
  }, [items, externalItems, handleItemsChanged, id])

  return (
    <section
      className="border border-gray-200 rounded my-2 pt-2 flex flex-col relative"
      key={id}
    >
      <header className="flex">
        <div className="ml-2 flex">
          <IconButton
            onClick={handlePositionClick(position, position - 1)}
            label="Move Up"
            icon={faChevronCircleUp}
            mode="default"
          />
          <IconButton
            onClick={handlePositionClick(position, position + 1)}
            label="Move Down"
            icon={faChevronCircleDown}
            mode="default"
          />
        </div>
        <input
          type="text"
          ref={inputEl}
          value={name}
          placeholder="Section Name"
          name={`section-${id}`}
          className="flex-grow border-gray-400 border rounded-sm mx-2 px-2 py-1"
          onChange={e => {
            handleNameChange?.(e.target.value)
          }}
        />
        {handleDelete ? (
          <div className="mr-2">
            <IconButton
              onClick={handleRemoveSection}
              label="Delete Section"
              icon={faTrash}
              mode="default"
            />
          </div>
        ) : null}
      </header>
      <div className="flex flex-wrap bg-gray-100 p-2 mt-2 w-full pb-10">
        {items.length < 1 ? (
          <div className="flex w-full p-6">
            <p className="text-center text-gray-600 m-auto">
              This section does not contain any items.
            </p>
          </div>
        ) : null}
        <div className="absolute bottom-0 bg-white border-gray-200 border-t inset-x-0 flex">
          <p className="text-xs my-auto p-1">
            Looking for a specific icon?
            <a
              href="https://fontawesome.com/v5.15/icons?d=gallery&p=2"
              className="text-button font-bold ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse Gallery
            </a>
          </p>
          <button
            className="bg-button rounded text-sm font-bold text-white px-2 ml-auto my-1 mr-1"
            onClick={handleAddItem}
          >
            <FontAwesomeIcon icon={faPlus} /> Add an Item
          </button>
        </div>
        {items.map((item, index) => (
          <Sortable
            sortDirection="horizontal"
            index={index}
            id={item.id}
            type="SECTION_ITEM"
            onSort={onSort}
            onFinishSort={onFinishSort}
            key={item.id}
          >
            <div key={item.id} className="p-1">
              <div className="rounded border border-gray-200 bg-white shadow-sm p-2">
                <SectionItem
                  {...item}
                  onDelete={id => {
                    setItems(items.filter(i => i.id !== id))
                  }}
                  onChange={handleChangedItem}
                />
              </div>
            </div>
          </Sortable>
        ))}
      </div>
    </section>
  )
}
