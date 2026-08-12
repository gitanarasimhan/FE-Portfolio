# Carousel

Simple accessible carousel component.

Props
- children: slides as React nodes
- interval: autoplay interval in ms (0 to disable)

Example

```tsx
import { Carousel } from './Carousel';

<Carousel interval={3000}>
  <div className="h-48 flex items-center justify-center">Slide 1</div>
  <div className="h-48 flex items-center justify-center">Slide 2</div>
  <div className="h-48 flex items-center justify-center">Slide 3</div>
</Carousel>
```
