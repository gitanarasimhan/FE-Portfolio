# Dropdown component

Props
- options: { value: string, label: string }[]
- value?: string
- onChange: (value) => void
- placeholder?: string

Example

```tsx
import { Dropdown } from '../components/Dropdown/Dropdown';

<Dropdown options={[{value:'a',label:'One'},{value:'b',label:'Two'}]} onChange={v=>console.log(v)} />
```
