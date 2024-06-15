import { useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export const useAutoScroll = () => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const scrollViewHeight = useRef<number | null>(null);
  const scrollViewContentHeight = useRef<number | null>(null);

  function updateScrollView() {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    ) {
      return;
    }

    const contentCanFit: boolean = (function () {
      return scrollViewContentHeight.current < scrollViewHeight.current + 1;
    })();

    if (scrollEnabled && contentCanFit) setScrollEnabled(false);
    if (!scrollEnabled && !contentCanFit) setScrollEnabled(true);
  }

  const onLayoutChange = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    scrollViewHeight.current = height;
    updateScrollView();
  };

  const onContentSizeChange = (_: number, h: number) => {
    scrollViewContentHeight.current = h;
    updateScrollView();
  };

  updateScrollView();

  return {
    scrollEnabled,
    onContentSizeChange,
    onLayoutChange,
  };
};
