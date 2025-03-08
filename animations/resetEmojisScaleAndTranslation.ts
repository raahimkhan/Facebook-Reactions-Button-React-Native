
import { Animated } from 'react-native';

export const ResetEmojisScaleAndTranslationAnimation = async (
    scales: React.MutableRefObject<{ id: number; scale: Animated.Value }[]>,
    emojiTranslationsY: React.MutableRefObject<{ id: number; translateY: Animated.Value }[]>
) => {
    scales.current.forEach(({ scale }) => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
    });
    emojiTranslationsY.current.forEach(({ translateY }) => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start();
    });
}
