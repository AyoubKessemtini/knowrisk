import { Edges } from 'react-native-safe-area-context';

export const getEdges = (
  fullscreen: boolean,
  withoutTopEdge: boolean,
  withoutBottomEdge: boolean,
): Edges => {
  if (fullscreen) return [];
  if (withoutTopEdge) return ['bottom'];
  if (withoutBottomEdge) return ['top'];
  return ['top', 'bottom'];
};
