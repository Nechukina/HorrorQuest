import { AuthorizationStatus, NameSpace } from '../../const';
import { UserData } from '../../types/user-process';
import { State } from '../../types/state';


export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state:State): UserData | null => state[NameSpace.User].userData;
