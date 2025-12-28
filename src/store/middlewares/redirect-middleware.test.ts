import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirectMiddleware } from './redirect-middleware';
import browserHistory from 'browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { State } from 'types/state';
import { redirectToRoute } from './action';
import { AppRoute } from '@constants';

vi.mock('browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirectMiddleware];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Main);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Main);
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to "/favorites" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Favorites);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Favorites);
  });

  it('should not redirect to "/offer" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Offer);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Offer);
  });

  it('should not redirect to "/not-found" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.NotFound);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.NotFound);
  });

  it('should not redirect to "/login" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Login };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});
