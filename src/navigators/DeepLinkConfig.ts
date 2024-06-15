import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './stacks/RootNavigator';
import { RootStackRoutes } from './routes';

export const deepLinkConfig: LinkingOptions<RootStackParamList> = {
  prefixes: ['airoApp://'],
  config: {
    screens: {
      [RootStackRoutes.FOO_STACK]: 'fooStack',
    },
  },
};
