
import { Animated } from 'react-native';
import {
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import {
    InstantResetEmojisScaleAndTranslation
} from '@animations/instantResetEmojisScaleAndTranslation';
import * as Haptics from 'expo-haptics';
import { HideToolTips } from '@utilities/hideToolTips';

export const UpdateEmojiScaleAndTranslationAnimation = async (
    scales: React.MutableRefObject<{ id: number; scale: Animated.Value }[]>,
    emojiTranslationsY: React.MutableRefObject<{ id: number; translateY: Animated.Value }[]>,
    gifPositions: { id: number; x: number }[],
    absoluteX: number,
    lastActiveEmojiRef: React.MutableRefObject<number | null>,
    setToolTipVisible: React.Dispatch<React.SetStateAction<{ id: number, visible: boolean }[]>>,
    screenSpacePercentage: { left: number; above: number },
) => {
    const scaleValue = 2;
    const scaleDownValue = 0.7;
    const translateYValue = screenSpacePercentage.above > 20 ? -hp(2) : hp(3);
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
        HideToolTips(setToolTipVisible);
    }
    else {
        setToolTipVisible(prevState =>
            prevState.map(tooltip => ({
                ...tooltip,
                visible: tooltip.id === activeId ? true : false
            }))
        );
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
