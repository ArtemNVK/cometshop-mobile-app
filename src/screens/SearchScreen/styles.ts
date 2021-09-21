import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchscreenFiltersContainerActive: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  selectedFilter: {
    color: '#cb11ab',
  },
  filterBtnSortContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  filtersBtn: {
    backgroundColor: 'transparent',
    color: '#cb11ab',
  },
  searchscreenFilters: {
    flexDirection: 'column',
    width: '100%',
    padding: 15,
  },
  searchscreenFiltersClose: {
    backgroundColor: 'transparent',
    width: 80,
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  filtersCloseBtn: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    padding: 20,
    borderWidth: 0.5,
    borderStyle: 'solid'
  },
});

export default styles;
