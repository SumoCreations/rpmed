import React from 'react'
import clsx from 'clsx'

export interface SelectableItem {
  id: string
  selected?: boolean
  title: string
  description: string
}

export interface ItemListProps {
  items: SelectableItem[]
  onSelect: (id: string) => void
}

export const ItemList: React.FC<ItemListProps> = ({ items, onSelect }) => {
  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    onSelect(id)
  }
  return (
    <div className="max-h-80 overflow-y-auto">
      <ul className="grid grid-cols-2 grid-flow-row gap-4 -mx-4 px-4">
        {items.map(({ title, id, description, selected }) => (
          <li key={id} className="relative">
            <button
              className="block inset-0 absolute hover:bg-primary hover:bg-opacity-5 rounded w-full"
              onClick={handleClick(id)}
            />
            <p
              className={clsx(
                selected ? 'border-primary border-2' : 'border border-gray-400',
                'rounded p-4 flex-col'
              )}
            >
              <span className="font-bold text-primary text-sm flex">
                {title}
              </span>
              <span className="text-gray-600 text-sm flex">{description}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
