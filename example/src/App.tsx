import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import AnimatedTabs, { AnimatedTab } from 'react-native-animated-tabs';

const tabs: number[] = [1, 2, 3, 4, 5, 6, 7];

export default function App() {
  const [index, setIndex] = React.useState<number>(3);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    width: '100%',
    backgroundColor: 'cyan',
  },
  tabContents: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  tab: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  activeTab: {
    color: 'red',
  },
});
