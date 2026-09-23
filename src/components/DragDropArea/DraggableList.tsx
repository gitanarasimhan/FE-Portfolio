import React from 'react';

type Props = {
  items: string[];
  onReorder: (items: string[]) => void;
  className?: string;
};

export const DraggableList: React.FC<Props> = ({ items, onReorder, className = '' }) => {
  const [list, setList] = React.useState(items);
  const dragIndex = React.useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = React.useState<number | null>(null);

  React.useEffect(() => setList(items), [items]);

  function onDragStart(e: React.DragEvent, idx: number) {
    dragIndex.current = idx;
    setDraggingIndex(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(idx));
  }

  function onDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === idx) return;
    e.dataTransfer.dropEffect = 'move';
  }

  function onDrop(e: React.DragEvent, idx: number) {
    e.preventDefault();

    const fromIndex = dragIndex.current;
    if (fromIndex == null || fromIndex === idx) {
      dragIndex.current = null;
      setDraggingIndex(null);
      return;
    }

    const newList = [...list];
    const [moved] = newList.splice(fromIndex, 1);
    newList.splice(idx, 0, moved);

    setList(newList);
    onReorder(newList);
    dragIndex.current = null;
    setDraggingIndex(null);
  }

  function onDragEnd() {
    dragIndex.current = null;
    setDraggingIndex(null);
  }

  return (
    <ul className={`draggable-list ${className}`.trim()}>
      {list.map((it, i) => (
        <li
          key={`${it}-${i}`}
          draggable
          onDragStart={(e) => onDragStart(e, i)}
          onDragOver={(e) => onDragOver(e, i)}
          onDrop={(e) => onDrop(e, i)}
          onDragEnd={onDragEnd}
          className={`draggable-list__item ${draggingIndex === i ? 'is-dragging' : ''}`.trim()}
        >
          <span className="draggable-list__item-label">{it}</span>
          <span className="draggable-list__handle" aria-hidden="true">⋮⋮</span>
        </li>
      ))}
    </ul>
  );
};

export default DraggableList;
