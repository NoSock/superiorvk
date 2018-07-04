import { AuthTransportModule } from './auth-transport.module';

describe('AuthTransportModule', () => {
  let authTransportModule: AuthTransportModule;

  beforeEach(() => {
    authTransportModule = new AuthTransportModule();
  });

  it('should create an instance', () => {
    expect(authTransportModule).toBeTruthy();
  });
});
