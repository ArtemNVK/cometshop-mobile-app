import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    marginVertical: 60,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
    marginVertical: 15,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%'
  },
});

export default styles;
