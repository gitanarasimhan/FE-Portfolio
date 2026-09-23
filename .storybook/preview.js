import React from 'react';
import '../src/styles/global.css';

export const parameters = {
  layout: 'padded',
  backgrounds: {
    default: 'canvas',
    values: [
      { name: 'canvas', value: '#f3f6fb' },
      { name: 'white', value: '#ffffff' },
    ],
  },
};

export const decorators = [
  (Story) => (
    <div style={{ minHeight: '100vh', padding: '32px', background: 'linear-gradient(180deg, #f5f8fc 0%, #eef3f9 100%)' }}>
      <Story />
    </div>
  ),
];
