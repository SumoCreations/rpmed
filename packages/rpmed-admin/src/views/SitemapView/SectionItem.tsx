import React, { useMemo, useState } from 'react'
import { IconButton, Select, Dialog, Icon } from 'rpmed-ui'
import { SectionItem as SectionItemType } from './types'
import * as icons from '@fortawesome/pro-regular-svg-icons'
import { useDocumentsQuery, usePagesQuery } from 'rpmed-schema'
import { useEffect } from 'react'
import { isEqual } from 'lodash'

const iconOptions = Object.keys(icons).map(i => ({
  id: i,
  name: i,
  icon: (icons as any)[i],
}))

export interface SectionItemProps extends SectionItemType {
  onDelete?: (uuid: string) => void
  onChange?: (item: SectionItemType) => void
}

export const SectionItem: React.FC<SectionItemProps> = ({
  name,
  id,
  description,
  type,
  target,
  icon,
  position,
  onDelete: handleDelete,
  onChange: handleChange,
}) => {
  const { data: documentsData } = useDocumentsQuery()
  const { data: pagesData } = usePagesQuery()
  const [confirm, setConfirm] = useState(false)
  const [iconQuery, setIconQuery] = useState(icon)
  const fromProps = useMemo(
    () => ({
      name,
      description,
      type,
      target,
      icon,
      id,
      position,
    }),
    [name, description, type, target, icon, id, position]
  )

  const [values, setValues] = useState<SectionItemType>({
    ...fromProps,
  })

  useEffect(() => {
    const update = { ...values, position }
    if (!isEqual(fromProps, update)) {
      handleChange?.(update)
    }
  }, [values, handleChange, fromProps, position])

  return (
    <ul className="flex flex-col relative">
      <Dialog
        title="Are you sure?"
        message="Are you sure you want to delete this item?"
        onConfirm={() => handleDelete?.(id)}
        onClose={() => setConfirm(false)}
        onCancel={() => setConfirm(false)}
        open={confirm}
      />
      <li className="flex">
        <div className="flex-grow flex-col flex">
          <ul className="flex">
            <li className="h-12 w-12 rounded-full bg-gray-100 text-xl mr-2 flex">
              <Icon icon={(icons as any)[values.icon]} mode="primary" />
            </li>
            <li className="w-full">
              <ul className="flex flex-grow flex-col">
                <li className="flex">
                  <input
                    value={values.name}
                    name={`item-name-${id}`}
                    placeholder="Item Name"
                    className="text-xs font-bold border border-gray-200 rounded-sm px-2 py-1"
                    onChange={e => {
                      setValues({ ...values, name: e.target.value })
                    }}
                  />
                  <div className="ml-auto">
                    <IconButton
                      icon={icons.faTrash}
                      label="Delete"
                      mode="primary"
                      onClick={() => setConfirm(true)}
                    />
                  </div>
                </li>
                <li className="mb-2 pb-1 w-full">
                  <input
                    value={values.description}
                    name={`item-description-${id}`}
                    placeholder="Item Description"
                    className="text-xs w-full border p-1 border-gray-200 rounded-sm"
                    onChange={e => {
                      setValues({ ...values, description: e.target.value })
                    }}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
      <li className="py-2 border-t border-b mb-2">
        <Select
          name={`item-target-${id}`}
          value={values.icon}
          placeholder="Select an icon"
          options={iconOptions
            .filter(i =>
              iconQuery?.length > 0 ? i.id.includes(iconQuery) : true
            )
            .filter(i => i.icon)
            .filter((_, idx) => idx < 40)}
          onChange={value => {
            setIconQuery(value)
          }}
          onSelect={id => {
            setIconQuery(id as any)
            setValues({ ...values, icon: id as any })
          }}
          clearable
        />
      </li>
      <li>
        <Select
          name={`item-type-${id}`}
          value={values.type}
          options={[
            { id: 'url', icon: icons.faGlobe, name: 'URL' },
            { id: 'document', icon: icons.faFileAlt, name: 'Document' },
            { id: 'tool', icon: icons.faTools, name: 'Tool / Form' },
            { id: 'page', icon: icons.faFile, name: 'Page' },
          ]}
          onSelect={id => {
            if (id !== values.type) {
              setValues({ ...values, type: id as any, target: '' })
            }
          }}
        />
      </li>
      <li className="mt-2">
        {values.type === 'url' ? (
          <input
            type="text"
            name="target"
            className="border-gray-300 border rounded-sm px-2 py-1 w-full"
            value={values.target}
            placeholder="http://example.com"
            onChange={e => {
              setValues({ ...values, target: e.target.value })
            }}
          />
        ) : null}
        {values.type === 'document' ? (
          <Select
            name={`item-target-${id}`}
            value={values.target}
            options={
              documentsData?.response.documents?.map(d => ({
                id: d?.slug as string,
                name: d?.title as string,
              })) ?? []
            }
            onSelect={id => {
              setValues({ ...values, target: id as any })
            }}
          />
        ) : null}
        {values.type === 'page' ? (
          <Select
            name={`item-target-${id}`}
            value={values.target}
            options={
              pagesData?.response.pages?.map(d => ({
                id: d?.id as string,
                name: d?.title as string,
              })) ?? []
            }
            onSelect={id => {
              setValues({ ...values, target: id as any })
            }}
          />
        ) : null}
        {values.type === 'tool' ? (
          <Select
            name={`item-target-${id}`}
            value={values.target}
            options={[
              { id: 'batteries', name: 'Recycling Form' },
              { id: 'contact', name: 'Contact Form' },
              { id: 'rga', name: 'RGA Tool' },
              { id: 'quote', name: 'Quote Form' },
              { id: 'register', name: 'Registration Form' },
              { id: 'mission', name: 'Mission Form' },
              { id: 'service-request', name: 'Service Request Form' },
              { id: 'troubleshooting', name: 'Troubleshooting' },
            ]}
            onSelect={selectedId => {
              setValues({ ...values, target: selectedId as any })
            }}
          />
        ) : null}
      </li>
    </ul>
  )
}
