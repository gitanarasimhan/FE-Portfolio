import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  args: {
    interval: 3000,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const slides = [
  <div key="1" className="h-48 flex items-center justify-center bg-slate-100 text-xl font-semibold">Slide 1</div>,
  <div key="2" className="h-48 flex items-center justify-center bg-blue-100 text-xl font-semibold">Slide 2</div>,
  <div key="3" className="h-48 flex items-center justify-center bg-emerald-100 text-xl font-semibold">Slide 3</div>,
];

export const Default: Story = {
  render: (args) => <Carousel {...args}>{slides}</Carousel>,
};

export const NoAutoplay: Story = {
  args: {
    interval: 0,
  },
  render: (args) => <Carousel {...args}>{slides}</Carousel>,
};
