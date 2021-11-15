import React from 'react';
import { DefaultProps, MantineColor, ClassNames, MantineSize } from '@mantine/styles';
import { Text } from '../../Text';
import { CheckboxIcon } from '../../Checkbox';
import { UnstyledButton } from '../../Button';
import { Transition } from '../../Transition';
import useStyles from './Step.styles';

export type StepStylesNames = ClassNames<typeof useStyles>;

export interface StepProps
  extends DefaultProps<StepStylesNames>,
    React.ComponentPropsWithoutRef<'button'> {
  /** Step state, controlled by Steps component */
  state?: 'stepInactive' | 'stepProgress' | 'stepCompleted';

  /** Step color from theme.colors */
  color?: MantineColor;

  /** Should icon be displayed */
  withIcon?: boolean;

  /** Step icon, defaults to step index + 1 when rendered within Stepper */
  icon?: React.ReactNode;

  /** Step icon displayed when step is completed */
  completedIcon?: React.ReactNode;

  /** Step icon displayed when step is in progress */
  progressIcon?: React.ReactNode;

  /** Step label, render after icon */
  label?: React.ReactNode;

  /** Step description */
  description?: React.ReactNode;

  /** Icon wrapper size in px */
  iconSize?: number;

  /** Component size */
  size?: MantineSize;
}

const defaultIconSizes = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 22,
  xl: 24,
};

export function Step({
  className,
  state,
  color,
  icon,
  completedIcon,
  progressIcon,
  label,
  description,
  withIcon = true,
  iconSize,
  size = 'md',
  ...others
}: StepProps) {
  const { classes, cx, theme } = useStyles({ color, iconSize, size }, { name: 'Steps' });
  const _iconSize = theme.fn.size({ size, sizes: defaultIconSizes });
  const _icon = state === 'stepCompleted' ? null : state === 'stepProgress' ? progressIcon : icon;

  return (
    <UnstyledButton className={cx(classes.step, classes[state], className)} {...others}>
      {withIcon && (
        <div className={classes.stepIcon}>
          <Transition mounted={state === 'stepCompleted'} transition="pop" duration={200}>
            {(transitionStyles) => (
              <div className={classes.stepCompletedIcon} style={transitionStyles}>
                {completedIcon || (
                  <CheckboxIcon indeterminate={false} width={_iconSize} height={_iconSize} />
                )}
              </div>
            )}
          </Transition>
          {state !== 'stepCompleted' ? _icon || icon : null}
        </div>
      )}
      <div className={classes.stepBody}>
        {label && <div className={classes.stepLabel}>{label}</div>}
        {description && (
          <Text className={classes.stepDescription} color="dimmed">
            {description}
          </Text>
        )}
      </div>
    </UnstyledButton>
  );
}

Step.displayName = '@mantine/core/Step';