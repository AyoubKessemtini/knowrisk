import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 29,
  },
  button: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 185,
    left: 35,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightRed,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
