import { AuthValidatorsModule } from './auth-validators.module';

describe('AuthValidatorsModule', () => {
  let authValidatorsModule: AuthValidatorsModule;

  beforeEach(() => {
    authValidatorsModule = new AuthValidatorsModule();
  });

  it('should create an instance', () => {
    expect(authValidatorsModule).toBeTruthy();
  });
});
