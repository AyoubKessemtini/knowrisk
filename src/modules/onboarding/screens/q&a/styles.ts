import { StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';

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
    width: 129,
    left: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightRed,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginLeft: 5,
    flex: 1,
  },
});
