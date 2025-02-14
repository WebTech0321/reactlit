import { Text, TextArea, TextAreaProps } from '@radix-ui/themes';
import { defineView, ViewComponentProps } from '@reactlit/core';
import { useDebouncedCallback } from 'use-debounce';
import { LabelType, renderLabel } from '../label';
import { useEffect, useState } from 'react';

export type TextAreaInputProps = Omit<TextAreaProps, 'value'> & {
  label?: LabelType;
  debounceDelay?: number;
};

export const TextAreaInputComponent = ({
  value,
  stateKey,
  setValue,
  onChange,
  label,
  debounceDelay = 300,
  ...props
}: TextAreaInputProps & ViewComponentProps<string>) => {
  const [rawValue, setRawValue] = useState(value ?? '');
  const debouncedSetValue = useDebouncedCallback((value) => {
    setValue(value);
  }, debounceDelay);
  useEffect(() => {
    setRawValue(value ?? '');
  }, [value]);
  return (
    <Text as="label">
      {renderLabel(label)}
      <TextArea
        value={rawValue}
        onChange={(e) => {
          setRawValue(e.target.value);
          debouncedSetValue(e.target.value);
          onChange?.(e);
        }}
        {...props}
      />
    </Text>
  );
};

export const TextAreaInput = (props: TextAreaInputProps) =>
  defineView<string>((viewProps) => (
    <TextAreaInputComponent {...viewProps} {...props} />
  ));
