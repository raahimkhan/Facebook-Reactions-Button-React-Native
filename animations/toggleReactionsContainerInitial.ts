
import { Animated } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

export const ToggleReactionsContainerInitialAnimation = async (
    opacity: Animated.Value,
    translateX: Animated.Value,
    translateY: Animated.Value,
    screenSpacePercentage: { left: number; above: number },
    reactionButtonPosition: { x: number; y: number },
) => {
    Animated.parallel([
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }),
        Animated.timing(translateY, {
            toValue: screenSpacePercentage.above > 20 ? reactionButtonPosition.y - hp(2) : reactionButtonPosition.y + hp(2),
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
