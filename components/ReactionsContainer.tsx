import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { Reaction } from '@interfaces/reaction';
import { ReactionData } from '@utilities/reactionData';
import { SelectReaction } from '@utilities/selectReaction';
import { Audio } from 'expo-av';

interface ReactionsContainerProps {
    reactionButtonPosition: { x: number; y: number };
    screenSpacePercentage: { left: number; above: number };
    setReaction: React.Dispatch<React.SetStateAction<Reaction>>;
    isMutedRef: React.RefObject<boolean | null>;
    sound: React.RefObject<Audio.Sound>;
    setShowReactionContainer: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReactionsContainer: React.FC<ReactionsContainerProps> = ({
    reactionButtonPosition,
    screenSpacePercentage,
    setReaction,
    isMutedRef,
    sound,
    setShowReactionContainer
}) => {

    const opacity = React.useRef(new Animated.Value(0)).current;
    const translateX = React.useRef(new Animated.Value(reactionButtonPosition.x)).current;
    const translateY = React.useRef(new Animated.Value(reactionButtonPosition.y)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
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
        <Animated.View
            style={[
                styles.reactionsContainer, {
                    opacity: opacity,
                    transform: [
                        { translateY },
                        { translateX },
                    ],
                }
            ]}
        >
            {ReactionData.map((reaction) => (
                reaction.reactionID !== 1 && reaction.reactionID !== 7 && (
                    <View
                        style={styles.gifContainer}
                        key={reaction.reactionID}
                        onStartShouldSetResponder={() => true}
                        onResponderRelease={() => SelectReaction(
                                reaction,
                                setReaction,
                                isMutedRef,
                                sound,
                                setShowReactionContainer
                            )
                        }
                    >
                        <Image
                            style={styles.gifStyle}
                            source={reaction.reactionGif}
                            contentFit="contain"
                            contentPosition="center"
                        />
                    </View>
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
        paddingLeft: wp(1),
        paddingRight: wp(1)
    },
    gifContainer: {
        flex: 1,
    },
    gifStyle: {
        flex: 1,
        width: wp(10),
        height: wp(10),
    },
});

export default ReactionsContainer;
