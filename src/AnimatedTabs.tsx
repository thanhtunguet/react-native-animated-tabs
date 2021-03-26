import type { FC, ReactElement, RefObject } from 'react';
import React from 'react';
import type {
  ScrollViewProps,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import AnimatedTab, { AnimatedTabProps } from './AnimatedTab';
import { width } from './_consts';
import { getTabPaneScrollIndex } from './_scroll-helper';
import { TabReducer, tabReducer, TabReducerActionType } from './_tab-reducer';

/**
 * File: AnimatedTabs.tsx
 * @created 2021-03-25 20:50:11
 * @author Thanh Tùng <ht@thanhtunguet.info>
 * @type {FC<AnimatedTabsProps>}
 */
const AnimatedTabs: FC<AnimatedTabsProps> = (
  props: AnimatedTabsProps
): ReactElement => {
  const {
    children,
    index,
    style,
    onIndexChange,
    renderTitle,
    tabTitleStyle,
    ...restProps
  } = props;

  const [tabTitleState, dispatchTabTitle] = React.useReducer<TabReducer>(
    tabReducer,
    []
  );

  const tabOffset = React.useMemo(() => {
    let tabOffsetMemo: number[] = [0];
    for (let i = 1; i < tabTitleState.length; i++) {
      tabOffsetMemo = [
        ...tabOffsetMemo,
        tabOffsetMemo[i - 1] + tabTitleState[i],
      ];
    }
    return tabOffsetMemo;
  }, [tabTitleState]);

  const handleTitleLayout = React.useCallback(
    (tabIndex: number): ViewProps['onLayout'] => (event) => {
      dispatchTabTitle({
        type: TabReducerActionType.SET,
        index: tabIndex,
        layout: event.nativeEvent.layout,
      });
    },
    []
  );

  const tabs: ReactElement<AnimatedTabProps>[] = React.useMemo(
    () => React.Children.toArray(children) as ReactElement<AnimatedTabProps>[],
    [children]
  );

  React.useEffect(() => {
    tabs.forEach((tab: ReactElement) => {
      if (tab.type !== AnimatedTab) {
        throw new Error(
          "AnimatedTab's children must be AnimatedTab components"
        );
      }
    });
  }, [tabs]);

  const ref: RefObject<ScrollView> = React.useRef<ScrollView>(null);
  const titleRef: RefObject<ScrollView> = React.useRef<ScrollView>(null);

  const handleTitleScrollToIndex = React.useCallback(
    (tabIndex: number) => {
      titleRef.current?.scrollTo({
        x: tabOffset[tabIndex] - (width - tabTitleState[tabIndex]) / 2,
        animated: true,
      });
    },
    [tabOffset, tabTitleState]
  );

  const handleScroll: ScrollViewProps['onScroll'] = React.useCallback(
    (event) => {
      const {
        contentOffset: { x },
      } = event.nativeEvent;
      const newIndex: number = getTabPaneScrollIndex(x);
      handleTitleScrollToIndex(newIndex);
      if (typeof onIndexChange === 'function') {
        onIndexChange(newIndex);
      }
    },
    [handleTitleScrollToIndex, onIndexChange]
  );

  const handleScrollToIndex = React.useCallback(
    (newIndex: number) => () => {
      handleTitleScrollToIndex(newIndex);
      ref.current?.scrollTo({
        animated: true,
        x: width * newIndex,
      });
    },
    [handleTitleScrollToIndex]
  );

  const isLayoutCalculated: boolean = React.useMemo(() => {
    let isCalculated: boolean = true;
    for (let i = 0; i < tabs.length; i++) {
      isCalculated =
        isCalculated &&
        typeof tabOffset[i] === 'number' &&
        !Number.isNaN(tabOffset[i]);
    }
    return isCalculated;
  }, [tabOffset, tabs.length]);

  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isLayoutCalculated && !isMounted) {
      ref.current.scrollTo({
        x: width * index,
        animated: false,
      });
      setIsMounted(true);
    }
  }, [index, isMounted, handleScrollToIndex, isLayoutCalculated]);

  const opacityStyle: StyleProp<ViewStyle> = {
    opacity: isMounted ? 1 : 0,
  };

  return (
    <View style={[styles.container, opacityStyle]}>
      <View style={[styles.width100]}>
        <Animated.ScrollView
          ref={titleRef}
          contentContainerStyle={[styles.titleContents]}
          style={[styles.titleContainer]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map((tab, tabIndex) => {
            return (
              <TouchableOpacity
                onPress={handleScrollToIndex(tabIndex)}
                onLayout={handleTitleLayout(tabIndex)}
                style={[StyleSheet.flatten(tabTitleStyle)]}
                key={tabIndex}
              >
                {renderTitle(tab.props.title, tabIndex === index)}
              </TouchableOpacity>
            );
          })}
        </Animated.ScrollView>
      </View>
      <Animated.ScrollView
        ref={ref}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        scrollEnabled={true}
        scrollEventThrottle={16}
        decelerationRate="fast"
        bounces={true}
        style={[styles.tabs, StyleSheet.flatten(style)]}
        onScroll={handleScroll}
        {...restProps}
      >
        {tabs.map((tab: ReactElement<AnimatedTabProps>, tabIndex: number) => {
          const { style: tabStyle } = tab.props;
          return (
            <View
              style={[styles.childTab, StyleSheet.flatten(tabStyle)]}
              key={tabIndex}
            >
              {tab}
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export interface AnimatedTabsProps extends ScrollViewProps {
  index?: number;

  onIndexChange?(index: number): void | Promise<void>;

  children?: ReactElement<AnimatedTabProps> | ReactElement<AnimatedTabProps>[];

  renderTitle?(title: ReactElement | string, isActive?: boolean): ReactElement;

  tabTitleStyle?: ViewProps['style'];
}

AnimatedTabs.defaultProps = {
  renderTitle: (title) => {
    return <Text>{title}</Text>;
  },
};

AnimatedTabs.propTypes = {
  index: PropTypes.number,
  onIndexChange: PropTypes.func,
  renderTitle: PropTypes.func,
};

AnimatedTabs.displayName = 'AnimatedTabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  width100: {
    width,
  },
  titleContainer: {
    flexShrink: 1,
    width: '100%',
  },
  titleContents: {
    display: 'flex',
    flexDirection: 'row',
  },
  tabs: {
    flexGrow: 1,
  },
  childTab: {
    width,
  },
});

export default AnimatedTabs;
