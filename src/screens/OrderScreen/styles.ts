import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderScreenContainer: {

  },
  orderItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    marginVertical: 10,
    shadowColor: 'black',
    shadowOpacity: 10,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  orderItemImg: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  smallImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  orderItemPrice: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
  },
  orderSummary: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
  },
  highlightedText: {

  },
  cartscreenProceedBtnContainer: {

  },
});

export default styles;
