import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
    </Carousel>
  ),
};
