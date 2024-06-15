import { RootStackParamList } from '@navigators/stacks/RootNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
