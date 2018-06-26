import { DashboardMessagesModule } from './dashboard-messages.module';

describe('DashboardMessagesModule', () => {
  let dashboardMessagesModule: DashboardMessagesModule;

  beforeEach(() => {
    dashboardMessagesModule = new DashboardMessagesModule();
  });

  it('should create an instance', () => {
    expect(dashboardMessagesModule).toBeTruthy();
  });
});
