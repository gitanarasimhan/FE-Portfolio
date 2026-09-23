import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dropdown } from './Dropdown';

const options = [
  { value: 'design', label: 'Design systems' },
  { value: 'product', label: 'Product strategy' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'operations', label: 'Operations' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  args: {
    options,
    placeholder: 'Choose a focus area',
    value: 'product',
    onChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string | null>(args.value ?? null);

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    );
  },
};

export const EmptySelection: Story = {
  args: {
    value: null,
    placeholder: 'Select a focus area',
  },
  render: (args) => {
    const [value, setValue] = React.useState<string | null>(args.value ?? null);

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    );
  },
};
