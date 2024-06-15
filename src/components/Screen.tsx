import { Colors } from '@constants/Colors';
import { TestIDs } from '@constants/TestIDs';
import { useAutoScroll } from '@hooks/useAutoScroll';
import { useThemeInterpolation } from '@hooks/useThemeInterpolation';
import { useHeaderHeight } from '@react-navigation/elements';
import { getEdges } from '@utils/getEdges';
import { IS_IOS } from '@utils/platform';
import React, { PropsWithChildren, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  containerStyles?: StyleProp<ViewStyle>;
  fullscreen?: boolean;
  withoutTopEdge?: boolean;
  withoutBottomEdge?: boolean;
  noHorizontalPadding?: boolean;
}

type Props = PropsWithChildren<ScreenProps>;

export const Screen = ({
  children,
  containerStyles,
  fullscreen = false,
  withoutTopEdge = false,
  withoutBottomEdge = false,
  noHorizontalPadding = false,
}: Props): JSX.Element => {
  const scrollRef = useRef<ScrollView>(null);
  const headerHeight = useHeaderHeight();
  const { scrollEnabled, onContentSizeChange, onLayoutChange } =
    useAutoScroll();
  const { animatedStyle } = useThemeInterpolation(
    Colors.backgroundWhite,
    Colors.backgroundBlack,
  );

  const edges: Edges = getEdges(fullscreen, withoutTopEdge, withoutBottomEdge);

  const generateViewStyles: StyleProp<ViewStyle> = [
    styles.container,
    animatedStyle,
    {
      paddingHorizontal: noHorizontalPadding ? 0 : 24,
    },
  ];

  return (
    <Animated.View
      style={generateViewStyles}
      testID={TestIDs.tests.Screen.AnimatedView}
    >
      <SafeAreaView
        edges={edges}
        style={styles.safeArewViewStyle}
        testID={TestIDs.tests.Screen.SafeAreaView}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={headerHeight}
          behavior={IS_IOS ? 'padding' : 'height'}
          style={styles.keyboardAvoidingViewStyle}
        >
          <ScrollView
            ref={scrollRef}
            scrollEnabled={scrollEnabled}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={[styles.contentContainer, containerStyles]}
            onLayout={onLayoutChange}
            onContentSizeChange={onContentSizeChange}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 8,
  },
  safeArewViewStyle: { flex: 1 },
  keyboardAvoidingViewStyle: { flex: 1 },
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
});
