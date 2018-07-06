import { AuthRedirectModule } from './auth-redirect.module';

describe('AuthRedirectModule', () => {
  let authRedirectModule: AuthRedirectModule;

  beforeEach(() => {
    authRedirectModule = new AuthRedirectModule();
  });

  it('should create an instance', () => {
    expect(authRedirectModule).toBeTruthy();
  });
});
