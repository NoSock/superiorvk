import { DashboardGeneralModule } from './dashboard-general.module';

describe('DashboardGeneralModule', () => {
  let dashboardGeneralModule: DashboardGeneralModule;

  beforeEach(() => {
    dashboardGeneralModule = new DashboardGeneralModule();
  });

  it('should create an instance', () => {
    expect(dashboardGeneralModule).toBeTruthy();
  });
});
