import React from 'react'
import { DndProvider } from 'react-dnd'

export const UiProvider: React.FC<{ backend: any }> = ({
  children,
  backend,
}) => <DndProvider backend={backend}>{children}</DndProvider>
