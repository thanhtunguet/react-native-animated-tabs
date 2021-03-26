import React, { FC, PropsWithChildren, ReactElement } from 'react';
import type { ViewProps } from 'react-native';

/**
 * File: AnimatedTab.tsx
 * @created 2021-03-25 20:56:27
 * @author Thanh Tùng <ht@thanhtunguet.info>
 * @type {FC<PropsWithChildren<AnimatedTabProps>>}
 */
const AnimatedTab: FC<PropsWithChildren<AnimatedTabProps>> = (
  props: PropsWithChildren<AnimatedTabProps>
): ReactElement => {
  const { children } = props;

  return <>{children}</>;
};

export interface AnimatedTabProps extends ViewProps {
  title?: ReactElement | string;
}

AnimatedTab.defaultProps = {
  //
};

AnimatedTab.propTypes = {
  //
};

AnimatedTab.displayName = 'AnimatedTab';

export default AnimatedTab;
