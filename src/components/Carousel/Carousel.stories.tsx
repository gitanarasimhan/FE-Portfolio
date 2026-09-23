import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const slideStyle: React.CSSProperties = {
  minHeight: 240,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#172033',
  background: 'linear-gradient(135deg, #eff5ff, #edf7f2)',
};

export const Default: Story = {
  render: () => (
    <div style={{ width: 640 }}>
      <Carousel>
        <div style={slideStyle}>Overview</div>
        <div style={{ ...slideStyle, background: 'linear-gradient(135deg, #eef3f9, #f6f1ff)' }}>Portfolio</div>
        <div style={{ ...slideStyle, background: 'linear-gradient(135deg, #edf7f2, #eef5ff)' }}>Performance</div>
      </Carousel>
    </div>
  ),
};
