import React from 'react';

type Props = {
  items: string[];
  onReorder: (items: string[]) => void;
  className?: string;
};

export const DraggableList: React.FC<Props> = ({ items, onReorder, className = '' }) => {
  const [list, setList] = React.useState(items);
  React.useEffect(() => setList(items), [items]);

  const dragIndex = React.useRef<number | null>(null);

  function onDragStart(e: React.DragEvent, idx: number) {
    dragIndex.current = idx;
    e.dataTransfer.effectAllowed = 'move';
  }

  function onDrop(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIndex.current == null) return;
    const newList = [...list];
    const [moved] = newList.splice(dragIndex.current, 1);
    newList.splice(idx, 0, moved);
    setList(newList);
    onReorder(newList);
  }

  return (
    <ul className={className}>
      {list.map((it, i) => (
        <li key={it} draggable onDragStart={(e) => onDragStart(e, i)} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>onDrop(e,i)} className="p-2 border mb-2 bg-white rounded">
          {it}
        </li>
      ))}
    </ul>
  );
};

export default DraggableList;
