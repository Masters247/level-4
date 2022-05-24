## UNDO REDO

## Bug fixing the undo redo functionality:

If the element is resized then dragged the array the x y coordinates get mixed up

## What Works

- multiple drag positions without resize works
  - Both for undo and redo
- multiple drags then resize once works
  - Both for undo and redo
- One resize then undo works
  - Works for undo
  - Not for redo

## The Bugs

Resizing the main elemente creates an issue with the x y coordinate
Looks like the coordinates of the main element are being taken from
the x y cordinates of the resizing element

x: 45.367431640625
y: 35.667510986328125
