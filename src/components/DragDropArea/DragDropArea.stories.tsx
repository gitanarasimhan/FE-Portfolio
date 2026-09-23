import type { Meta, StoryObj } from '@storybook/react';
import { DragDropArea } from './DragDropArea';

const meta: Meta<typeof DragDropArea> = {
  title: 'Components/DragDropArea',
  component: DragDropArea,
  parameters: {
    layout: 'centered',
  },
  args: {
    accept: 'image/*',
    onFiles: (files) => console.log('files:', files),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DragDropArea {...args} />,
};

export const AnyFileType: Story = {
  args: {
    accept: '*',
  },
  render: (args) => <DragDropArea {...args} />,
};
