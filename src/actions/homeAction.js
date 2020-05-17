import * as types from '../constants/types';
import DB from '../constants/ImitationDB';

export const getMaps = () => {
    const PublicMaps = DB.PublicMaps;
    const PrivateMaps = DB.PrivateMaps;

    return {
        type: types.home.GET_MAPS,
        payload: {
            publicMaps: PublicMaps,
            privateMaps: PrivateMaps
        }
    };
};