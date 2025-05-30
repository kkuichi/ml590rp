'use client';

import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import {
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Backdrop, Grid2 } from '@mui/material';
import { useBreakPoint } from '@/lib/utils/hooks/useBreakPoint';
import { useUpdateRetrospectiveMutation } from '@/store/api/retrospectivesEndpoints/retrospectivesEndpoints';
import {
  IRetrospective,
  ISortableContainer,
  ISortableItem,
} from '@/types/types';
import { ESortableItems } from './constants';
import { SortableContainerOverlay } from './Overlays/SortableContainerOverlay';
import { SortableItemOverlay } from './Overlays/SortableItemOverlay';
import { SortableContainer } from './SortableContainer';
import { SortableItem } from './SortableItem';

const NoSsrDndContext = dynamic(
  () => import('@dnd-kit/core').then((mod) => mod.DndContext),
  { ssr: false }
);

interface IMultipleSortableContainerProps {
  data: IRetrospective['data'];
  loading: boolean;
  disabled?: boolean;
  displayedContainer?: number;
}

export const MultipleSortableContainer: FC<IMultipleSortableContainerProps> =
  memo(({ data, loading, disabled = false, displayedContainer }) => {
    const [updateRetrospective, { isLoading: isUpdating }] =
      useUpdateRetrospectiveMutation();
    const { id } = useParams();
    const [containers, setContainers] = useState<Array<ISortableContainer>>([]);
    const [items, setItems] = useState<Array<ISortableItem>>([]);

    const [activeContainer, setActiveContainer] =
      useState<ISortableContainer | null>(null);
    const [activeItem, setActiveItem] = useState<ISortableItem | null>(null);

    useEffect(() => {
      setContainers(data.containers);
      setItems(data.items);
    }, [data]);

    const containersIds = useMemo(
      () => containers.map(({ id }) => id),
      [containers]
    );
    const itemsIds = useMemo(() => items.map(({ id }) => id), [items]);
    const { xs, sm } = useBreakPoint();
    const sensors = useSensors(
      useSensor(xs || sm ? TouchSensor : PointerSensor, {
        activationConstraint: { delay: 500, tolerance: 20 },
      })
    );

    const handleDragEnd = (event: DragEndEvent) => {
      setActiveContainer(null);
      setActiveItem(null);

      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      if (
        active.data.current?.type !== ESortableItems.item &&
        activeId !== overId
      ) {
        const activeContainerIndex = containersIds.findIndex(
          (id) => id === activeId
        );
        const overContainerIndex = containersIds.findIndex(
          (id) => id === overId
        );
        const updatedContainers = arrayMove(
          containers,
          activeContainerIndex,
          overContainerIndex
        );
        updateRetrospective({
          data: {
            containers: updatedContainers,
            items,
          },
          _id: id as string,
        });
        setContainers(updatedContainers);
      } else {
        updateRetrospective({
          data: {
            containers,
            items,
          },
          _id: id as string,
        });
      }
    };

    const handleDragStart = (event: DragStartEvent) => {
      const { active } = event;

      if (active.data.current?.type === ESortableItems.container) {
        setActiveContainer(active.data.current.container);
        return;
      }
      if (active.data.current?.type === ESortableItems.item) {
        setActiveItem(active.data.current.item);
        return;
      }
    };

    const handleDragOver = (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return;

      const isActiveItem = active.data.current?.type === ESortableItems.item;
      const isOverItem = over.data.current?.type === ESortableItems.item;

      if (!isActiveItem) return;

      setItems((prevItems) => {
        const activeItemIndex = prevItems.findIndex(
          (item) => item.id === activeId
        );
        if (activeItemIndex === -1) return prevItems;

        if (isActiveItem && isOverItem) {
          const overItemIndex = prevItems.findIndex(
            (item) => item.id === overId
          );
          if (overItemIndex === -1) return prevItems;

          const updatedItems = [...prevItems];
          updatedItems[activeItemIndex] = {
            ...updatedItems[activeItemIndex],
            containerId: updatedItems[overItemIndex].containerId,
          };

          return arrayMove(updatedItems, activeItemIndex, overItemIndex);
        }

        const isOverContainer =
          over.data.current?.type === ESortableItems.container;
        if (isActiveItem && isOverContainer) {
          const updatedItems = [...prevItems];
          updatedItems[activeItemIndex] = {
            ...updatedItems[activeItemIndex],
            containerId: overId.toString(),
          };

          return updatedItems;
        }

        return prevItems;
      });
    };

    return (
      <Grid2
        container
        width='fit-content'
        maxWidth='100%'
        wrap='nowrap'
        height='100%'
        borderRadius={5}
        border={1}
        borderColor='divider'
        bgcolor={'beige.200'}
        sx={{ overflowX: 'auto' }}
      >
        <NoSsrDndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          collisionDetection={pointerWithin}
          modifiers={[]}
        >
          <SortableContext
            disabled={disabled}
            items={containersIds}
            strategy={horizontalListSortingStrategy}
          >
            {displayedContainer === undefined ? (
              containers.map((sortableContainer) => (
                <SortableContainer
                  key={sortableContainer.id}
                  {...sortableContainer}
                  disabled={disabled}
                >
                  <SortableContext
                    disabled={disabled}
                    items={itemsIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {items.map((item) =>
                      item.containerId === sortableContainer.id ? (
                        <SortableItem
                          disabled={disabled}
                          key={item.id}
                          {...item}
                        />
                      ) : null
                    )}
                  </SortableContext>
                </SortableContainer>
              ))
            ) : containers.length ? (
              <SortableContainer
                key={containers[displayedContainer].id}
                {...containers[displayedContainer]}
                disabled={disabled}
              >
                <SortableContext
                  disabled={disabled}
                  items={itemsIds}
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((item) =>
                    item.containerId === containers[displayedContainer].id ? (
                      <SortableItem
                        disabled={disabled}
                        key={item.id}
                        {...item}
                      />
                    ) : null
                  )}
                </SortableContext>
              </SortableContainer>
            ) : null}
          </SortableContext>
          {typeof document !== 'undefined' &&
            createPortal(
              <DragOverlay zIndex={100000}>
                {activeContainer && (
                  <SortableContainerOverlay
                    disabled={disabled}
                    {...activeContainer}
                  />
                )}
                {activeItem && <SortableItemOverlay {...activeItem} />}
              </DragOverlay>,
              document.body
            )}
        </NoSsrDndContext>
        <Backdrop open={isUpdating || loading} sx={{ position: 'absolute' }} />
      </Grid2>
    );
  });
