import React, { useEffect } from 'react';
import {
    StyleSheet,
    Animated,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { ReactionData } from '@utilities/reactionData';

interface ReactionsContainerProps {
    reactionButtonPosition: { x: number; y: number };
    screenSpacePercentage: { left: number; above: number };
}

const ReactionsContainer: React.FC<ReactionsContainerProps> = ({
    reactionButtonPosition,
    screenSpacePercentage,
}) => {

    const opacityAnim = React.useRef(new Animated.Value(0)).current;
    const translateY = React.useRef(new Animated.Value(reactionButtonPosition.y)).current;
    const translateX = React.useRef(new Animated.Value(reactionButtonPosition.x)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: screenSpacePercentage.above > 20 ? reactionButtonPosition.y - hp(8) : reactionButtonPosition.y + hp(8),
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: screenSpacePercentage.left < 35 ? reactionButtonPosition.x + wp(8) : reactionButtonPosition.x - wp(16),
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[
            styles.reactionsContainer, {
                opacity: opacityAnim,
                transform: [
                    { translateY },
                    { translateX },
                ],
            }
        ]}>
            {ReactionData.map((reaction) => (
                reaction.reactionID !== 1 && reaction.reactionID !== 7 && (
                    <Image
                        key={reaction.reactionID}
                        style={{
                            flex: 1,
                            width: wp(10),
                            height: wp(10),
                        }}
                        source={reaction.reactionGif}
                        contentFit="contain"
                        contentPosition="left"
                    />
                )
            ))}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    reactionsContainer: {
        position: 'absolute',
        width: wp(53),
        backgroundColor: '#3b3c3e',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: hp(0.7),
    },
});

export default ReactionsContainer;
