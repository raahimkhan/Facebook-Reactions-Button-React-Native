
import { Animated } from 'react-native';
import {
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import {
    InstantResetEmojisScaleAndTranslation
} from '@animations/instantResetEmojisScaleAndTranslation';
import * as Haptics from 'expo-haptics';

export const UpdateEmojiScaleAndTranslationAnimation = async (
    scales: React.MutableRefObject<{ id: number; scale: Animated.Value }[]>,
    emojiTranslationsY: React.MutableRefObject<{ id: number; translateY: Animated.Value }[]>,
    gifPositions: { id: number; x: number }[],
    absoluteX: number,
    lastActiveEmojiRef: React.MutableRefObject<number | null>
) => {
    const scaleValue = 2;
    const scaleDownValue = 0.7;
    const translateYValue = -hp(2);
    let activeId: number | null = null;
    gifPositions.forEach((gif, i) => {
        if (i >= gifPositions.length - 1) {
            return;
        }
        const { x: startX } = gif;
        const { x: endX } = gifPositions[i + 1];
        if (absoluteX >= startX && absoluteX <= endX) {
            activeId = gif.id;
        }
    });
    const lastGif = gifPositions[gifPositions.length - 1];
    if (absoluteX > lastGif.x + 40) {
        activeId = null;
    }
    else if (absoluteX >= lastGif.x) {
        activeId = 8;
    }
    if (activeId === null) {
        InstantResetEmojisScaleAndTranslation(scales, emojiTranslationsY);
        lastActiveEmojiRef.current = null;
    }
    else {
        if (activeId !== lastActiveEmojiRef.current) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            lastActiveEmojiRef.current = activeId;
        }
        scales.current.forEach(({ id, scale }) => {
            scale.stopAnimation();
            scale.setValue(id === activeId ? scaleValue : scaleDownValue);
        });
        emojiTranslationsY.current.forEach(({ id, translateY }) => {
            translateY.stopAnimation();
            translateY.setValue(id === activeId ? translateYValue : 0);
        });
    }
}
