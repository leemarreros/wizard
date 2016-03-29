import Dimensions from 'Dimensions';
var window = Dimensions.get('window');

module.exports = {
  restUrl: 'http://localhost:8000',
  brandFont: 'BadScript-Regular',
  brandColor: '#50E3C2',
  backgroundClr: '#4A90E2',
  titleForm: {
      fontFamily: 'BadScript-Regular',
      fontSize: 55,
      color: 'white',
      textAlign: 'center'
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'white',
    borderBottomWidth: 1.5
  },
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  buttonNext: {
        position: 'absolute',
        alignItems: 'center',
        width: window.width,
        height: 43,
        backgroundColor: '#FFEC00',
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 0
    },
    btnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnNextText: {
        fontFamily: 'Avenir',
        color: '#4A90E2',
        textAlign: 'center',
        fontSize: 17,
        marginRight: 20
    },
};