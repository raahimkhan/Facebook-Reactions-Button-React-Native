
import { Animated } from 'react-native';

export const InstantResetEmojisScaleAndTranslation = async (
    scales: React.MutableRefObject<{ id: number; scale: Animated.Value }[]>,
    emojiTranslationsY: React.MutableRefObject<{ id: number; translateY: Animated.Value }[]>
) => {
    scales.current.forEach(({ scale }) => {
        scale.stopAnimation();
        scale.setValue(1);
    });
    emojiTranslationsY.current.forEach(({ translateY }) => {
        translateY.stopAnimation();
        translateY.setValue(0);
    });
}
