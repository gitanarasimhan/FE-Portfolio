# DragDropArea

Two helpers:
- DragDropArea: accepts file drops and calls onFiles(files: File[])
- DraggableList: simple HTML5 drag reordering for arrays of strings

Example

```tsx
<DragDropArea accept="image/*" onFiles={files => console.log(files)} />

<DraggableList items={["One","Two"]} onReorder={items => console.log(items)} />
```
