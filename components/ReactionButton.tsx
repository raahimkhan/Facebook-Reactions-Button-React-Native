import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Reaction } from '@interfaces/reaction';
import Feather from '@expo/vector-icons/Feather';
import { ReactionData } from "@utilities/reactionData";
import { ToggleLike } from '@utilities/toggleLike';
import { VolumeManager } from 'react-native-volume-manager';
import { Audio } from 'expo-av';

interface ReactionButtonProps {}

const ReactionButton: React.FC<ReactionButtonProps> = () => {

    useEffect(() => {
        const silentListener = VolumeManager.addSilentListener((status) => {
            isMutedRef.current = status.isMuted;
        });
        return () => silentListener.remove();;
    }, []);

    const isMutedRef = useRef<boolean | null>(null);
    const sound = useRef<Audio.Sound>(new Audio.Sound());

    const [reaction, setReaction] = useState<Reaction>(ReactionData[0]);

    const ToggleReactionsModal = () => {
        
    }

    return (
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => ToggleLike(reaction, setReaction, isMutedRef, sound)}
            onLongPress={() => ToggleReactionsModal()}
            activeOpacity={1}
        >
            <View style={styles.buttonContentContainer}>
                <View style={styles.buttonIconContainer}>
                    {
                        reaction.reactionName === 'default' ? (
                            <Feather
                                name="thumbs-up"
                                size={wp(6.5)}
                                color="white"
                            />
                        ) : (
                            <Image
                                source={reaction.reactionImage}
                                style={styles.iconStyle}
                            />
                        )
                    }
                </View>
                <View style={styles.buttonTitleContainer}>
                    <Text style={[styles.buttonTitleStyle, { color: reaction.reactionTextColor }]}>
                        { reaction.reactionName === 'default' ? 'Like' : reaction.reactionName }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#262729',
        borderColor: 'black',
        width: wp(38),
        paddingVertical: hp(1.2),
    },
    buttonContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    buttonIconContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    iconStyle: {
        resizeMode: 'contain',
        width: wp(7),
        height: wp(7),
    },
    buttonTitleContainer: {
        flex: 1.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    buttonTitleStyle: {
        fontSize: wp(5),
        marginLeft: wp(3)
    },
});

export default ReactionButton;
