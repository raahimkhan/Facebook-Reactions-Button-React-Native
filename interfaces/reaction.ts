import { ImageSourcePropType } from 'react-native';

export interface Reaction {
    reactionID: number;
    reactionName: string;
    reactionTextColor: string;
    reactionImage: ImageSourcePropType;
    reactionGif: ImageSourcePropType;
}
