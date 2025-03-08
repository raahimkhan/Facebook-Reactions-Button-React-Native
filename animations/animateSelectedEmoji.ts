import { Animated, Easing } from 'react-native';

export const AnimateSelectedEmoji = (
    reactionID: number,
    scales: React.MutableRefObject<{ id: number; scale: Animated.Value }[]>,
    emojiTranslationsY: React.MutableRefObject<{ id: number; translateY: Animated.Value }[]>,
    emojiTranslationsX: React.MutableRefObject<{ id: number; translateX: Animated.Value }[]>,
    reactionButtonPosition: { x: number; y: number },
    gifPositions: { x: number, y: number, id: number }[],
    emojiOpacities: React.MutableRefObject<{ id: number; opacity: Animated.Value }[]>,
) => {
    const scaleAnim = scales.current.find(scale => scale.id === reactionID)?.scale;
    const translateXAnim = emojiTranslationsX.current.find(trans => trans.id === reactionID)?.translateX;
    const translateYAnim = emojiTranslationsY.current.find(trans => trans.id === reactionID)?.translateY;
    const gifXValue = gifPositions.find(gif => gif.id === reactionID)?.x;
    const gifYValue = gifPositions.find(gif => gif.id === reactionID)?.y;
    const gifOpacity = emojiOpacities.current.find(opacity => opacity.id === reactionID)?.opacity;
    if (!scaleAnim || !translateXAnim || !translateYAnim || !gifXValue || !gifYValue || !gifOpacity)
        return;
    const targetX = gifXValue - reactionButtonPosition.x;
    const targetY = reactionButtonPosition.y - gifYValue;
    Animated.sequence([
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1.5,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: -80,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            })
        ]),
        Animated.parallel([
            Animated.timing(translateXAnim, {
                toValue: -targetX/2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: targetY/2 + 50,
                duration: 200,
                useNativeDriver: true,
            })
        ]),
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 200,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(gifOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            })
        ])
    ]).start();
};
