import { AuthRegisterModule } from './auth-register.module';

describe('AuthRegisterModule', () => {
  let authRegisterModule: AuthRegisterModule;

  beforeEach(() => {
    authRegisterModule = new AuthRegisterModule();
  });

  it('should create an instance', () => {
    expect(authRegisterModule).toBeTruthy();
  });
});
