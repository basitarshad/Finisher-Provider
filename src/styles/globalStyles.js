import { StyleSheet } from 'react-native';
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';


export default StyleSheet.create({
    wrapper: {
        flex: 1,
        height: hp('100%'),
        width: wp('100%'),
        position: 'relative',
        backgroundColor: 'transparent'
      },
      iconStyle: {
        
      }
});
