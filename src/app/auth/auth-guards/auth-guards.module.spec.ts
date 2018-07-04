import { AuthGuardsModule } from './auth-guards.module';

describe('AuthGuardsModule', () => {
  let authGuardsModule: AuthGuardsModule;

  beforeEach(() => {
    authGuardsModule = new AuthGuardsModule();
  });

  it('should create an instance', () => {
    expect(authGuardsModule).toBeTruthy();
  });
});
