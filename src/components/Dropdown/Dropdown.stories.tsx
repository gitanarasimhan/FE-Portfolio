import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dropdown } from './Dropdown';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    options,
    placeholder: 'Choose a fruit',
    value: 'banana',
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
    placeholder: 'Select a fruit',
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
