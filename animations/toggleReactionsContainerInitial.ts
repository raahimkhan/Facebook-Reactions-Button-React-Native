
import { Animated } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import { IsIphoneSE } from '@utilities/mobileDevices';

export const ToggleReactionsContainerInitialAnimation = async (
    opacity: Animated.Value,
    translateX: Animated.Value,
    translateY: Animated.Value,
    screenSpacePercentage: { left: number; above: number },
    reactionButtonPosition: { x: number; y: number },
) => {
    let translateYToValue;
    if (IsIphoneSE()) {
        translateYToValue = screenSpacePercentage.above > 20 ? reactionButtonPosition.y - hp(7) : reactionButtonPosition.y + hp(7);
    }
    else {
        translateYToValue = screenSpacePercentage.above > 20 ? reactionButtonPosition.y - hp(2) : reactionButtonPosition.y + hp(6);
    }
    Animated.parallel([
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }),
        Animated.timing(translateY, {
            toValue: translateYToValue,
            duration: 200,
            useNativeDriver: true,
        }),
        Animated.timing(translateX, {
            toValue: screenSpacePercentage.left < 35 ? reactionButtonPosition.x + wp(8) : reactionButtonPosition.x - wp(16),
            duration: 200,
            useNativeDriver: true,
        }),
    ]).start();
}
