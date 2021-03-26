react-native-scrollview-tabs
============================
Simple animated tabs using `ScrollView` for React Native.
## Installation
Bare React Native projects:
```sh
yarn add react-native-scrollview-tabs
```
Expo projects:
```sh
expo install react-native-scrollview-tabs
```
## Usage

[Online demo](https://snack.expo.io/@thanhtunguet/react-native-animated-tabs) at Expo Snack

```tsx
import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import AnimatedTabs, { AnimatedTab } from 'react-native-animated-tabs';

const tabs: number[] = [1, 2, 3, 4, 5, 6, 7];

export default function App() {
  const [index, setIndex] = React.useState<number>(0);

  const handleIndexChange = React.useCallback((newIndex: number) => {
    setIndex(newIndex);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <AnimatedTabs
          index={index}
          onIndexChange={handleIndexChange}
          style={styles.tabs}
          contentContainerStyle={styles.tabContents}
          renderTitle={(title: string, isActive: boolean) => {
            return (
              <Text style={[styles.tab, isActive && styles.activeTab]}>
                {title}
              </Text>
            );
          }}
        >
          {tabs.map((tab: number) => (
            <AnimatedTab key={tab} title={`Tab ${tab}`}>
              <Text>Tab {tab}</Text>
            </AnimatedTab>
          ))}
        </AnimatedTabs>
      </SafeAreaView>
    </>
  );
}
```
## Props
### AnimatedTabs props
| Prop Name | Signature | Description |
|---|---|---|
| index | number | Default active tab index |
| onIndexChange | (index: number) => void | Promise<void> | Tab index change callback |
| renderTitle | (title: ReactElement / string, isActive?: boolean) => ReactElement | Render custom title |
| tabTitleStyle | ViewProps['style'] | Style for tab title |
| children | ReactElement<AnimatedTabProps> / ReactElement<AnimatedTabProps>[] | AnimatedTab elements |

### AnimatedTab props
| Prop Name | Signature | Description |
|---|---|---|
| title  |  string | ReactElement  |  Tab title  |
