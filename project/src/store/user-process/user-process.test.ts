import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user-data';
import { makeFakeUserData } from '../../utils/mocks';
import { requireAuthorization, userProcess } from './user-process';

describe('Reducer: userProcess', () => {
  const state = {authorizationStatus: AuthorizationStatus.Unknown,  data: {} as UserData};

  it('Следует получить авторизованного пользователя' , () => {
    const userData = makeFakeUserData();

    expect(userProcess.reducer(state, requireAuthorization({authorizationStatus:  AuthorizationStatus.Auth, data: userData})))
      .toEqual({authorizationStatus:  AuthorizationStatus.Auth, data: userData});
  });
});
