import React, { useState, useCallback } from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Context } from 'immutability-helper'
import clsx from 'clsx'
import {
  Sortable,
  SortableProps,
  SortableCallbacks,
  OnSortCallback,
} from './Sortable'

const { update } = new Context()

export default {
  title: 'Behavior/Sortable',
  component: Sortable,
} as Meta

const Template: Story<SortableProps> = (args) => {
  const [cards, setCards] = useState([
    {
      index: 0,
      text: 'Doug Cholewa',
      color: 'bg-accent',
    },
    {
      index: 1,
      text: 'Allie Weiner',
      color: 'bg-blue-400',
    },
    {
      index: 2,
      text: 'Jim Jeffers',
      color: 'bg-green-400',
    },
    {
      index: 3,
      text: 'Gail Beauchamp',
      color: 'bg-purple-600',
    },
  ])

  const onSort: OnSortCallback = useCallback(
    (_, dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      const updates = update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
      console.log(
        'dragCard',
        dragCard.text,
        `${dragIndex} -> ${hoverIndex}`,
        'cards',
        cards.map((c) => c.text),
        'updates',
        updates.map((c) => c.text)
      )
      setCards(updates)
    },
    [cards, setCards]
  )

  const onFinishSort = useCallback(
    action(
      `Sort finished: ${cards.map((i: any) => i.text.split(' ')[0]).join(', ')}`
    ),
    [cards]
  )

  const callbacks: SortableCallbacks = {
    onSort,
    onFinishSort,
  }

  return (
    <div className="p-2">
      <div
        className={clsx(
          args.sortDirection === 'horizontal' ? 'flex-row' : 'flex-col',
          'flex'
        )}
      >
        {cards.map((c, index) => (
          <Sortable
            {...(args as any)}
            id={c.text}
            index={index}
            {...callbacks}
            key={c.text}
          >
            <div
              className={clsx(c.color, 'm-2')}
              style={{
                height: 72,
                width: args.sortDirection === 'horizontal' ? 72 : '100%',
              }}
            >
              <div className="m-auto flex">{c.text}</div>
            </div>
          </Sortable>
        ))}
      </div>
    </div>
  )
}

export const Horizontal = Template.bind({})
Horizontal.args = {
  sortDirection: 'horizontal',
  id: '1',
  index: 1,
  type: 'EXAMPLE',
}

export const Vertical = Template.bind({})
Vertical.args = {
  sortDirection: 'vertical',
  id: '1',
  index: 1,
  type: 'EXAMPLE',
}
