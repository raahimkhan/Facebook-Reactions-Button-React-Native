import { Dimensions } from 'react-native';

export const IsIphone16ProMax = () => {
    return Dimensions.get('window').height === 956 ? true : false;
}

export const IsIphone16Pro = () => {
    return Dimensions.get('window').height === 874 ? true : false;
}

export const IsIphoneSE = () => {
    return Dimensions.get('window').height === 667 ? true : false;
}

export const IsIphone13Mini = () => {
    return Dimensions.get('window').height === 812 ? true : false;
}