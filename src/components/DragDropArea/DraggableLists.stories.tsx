import type { Meta, StoryObj } from '@storybook/react';
import { DraggableList } from './DraggableList';

const meta: Meta<typeof DraggableList> = {
  title: 'Components/DraggableList',
  component: DraggableList,
  args: {
    items: ['One', 'Two', 'Three'],
    onReorder: (items) => console.log('reordered:', items),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DraggableList {...args} />,
};
