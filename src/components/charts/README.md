# Charts

AdvancedChart is a small wrapper around Recharts that lets you supply multiple series of type 'line' | 'bar' | 'area'.

Install dependency:

```bash
npm install recharts
# or
yarn add recharts
```

Example

```tsx
<AdvancedChart
  data={[{x:'2023-01', a:10, b:20},{x:'2023-02', a:14, b:18}]}
  xKey="x"
  series={[{type:'line',dataKey:'a',name:'Series A'},{type:'bar',dataKey:'b',name:'Series B'}]}
/>
```
