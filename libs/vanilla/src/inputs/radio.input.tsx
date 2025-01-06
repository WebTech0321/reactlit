import {
  defineTransformView,
  defineView,
  ViewComponentProps,
  ViewDefinition,
} from '@reactlit/core';
import { DetailedHTMLProps } from 'react';

export type RadioInputProps<T> = Omit<
  DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'value' | 'disabled'
> & {
  data: T[];
  label?: string | React.ReactNode;
  containerClassName?: string;
  format?: (value: T) => string | React.ReactNode;
  valueof?: (value: T) => string;
  disabled?: string[] | ((value: T) => boolean);
};

export const RadioInputComponent = <T,>({
  value,
  stateKey,
  setValue,
  onChange,
  data,
  containerClassName,
  format,
  valueof,
  disabled,
  label,
  ...props
}: RadioInputProps<T> & ViewComponentProps<string | T>) => {
  return (
    <div className="flex gap-2 items-center">
      {label && <label htmlFor={stateKey}>{label}</label>}
      <div className={containerClassName}>
        {data.map((item) => {
          const isChecked = valueof ? valueof(item) === value : item === value;
          const itemKey = `${stateKey}-${valueof?.(item) ?? item.toString()}`;
          let disabledValue = false;

          if (typeof disabled === 'function') {
            disabledValue = disabled(item);
          } else if (Array.isArray(disabled)) {
            disabledValue = disabled.includes(
              valueof?.(item) ?? item.toString()
            );
          }

          return (
            <div key={itemKey}>
              <input
                type="radio"
                checked={isChecked}
                id={itemKey}
                name={itemKey}
                onChange={(e) => {
                  const _value = valueof?.(item) ?? item;
                  if (e.target.checked) setValue(_value);
                }}
                disabled={disabledValue}
                {...props}
              />
              <label htmlFor={itemKey}>
                {format?.(item) ?? item.toString()}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export type RadioInputDefinition<T, P> = P extends { valueof: (v: T) => string }
  ? ViewDefinition<string | T, T>
  : ViewDefinition<T>;

export const RadioInput = <T, P extends RadioInputProps<T>>(
  data: P['data'],
  { valueof, ...props }: Omit<P, 'data'>
): RadioInputDefinition<T, P> => {
  if (valueof) {
    return defineTransformView<string | T, T>(
      (viewProps) => (
        <RadioInputComponent
          data={data}
          {...viewProps}
          {...props}
          valueof={valueof}
        />
      ),
      ({ value }) => data.find((d) => valueof(d) === value)
    ) as RadioInputDefinition<T, P>;
  } else {
    return defineView<T>((viewProps) => (
      <RadioInputComponent data={data} {...viewProps} {...props} />
    )) as RadioInputDefinition<T, P>;
  }
};