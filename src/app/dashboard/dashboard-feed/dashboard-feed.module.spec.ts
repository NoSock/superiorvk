import { DashboardFeedModule } from './dashboard-feed.module';

describe('DashboardFeedModule', () => {
  let dashboardFeedModule: DashboardFeedModule;

  beforeEach(() => {
    dashboardFeedModule = new DashboardFeedModule();
  });

  it('should create an instance', () => {
    expect(dashboardFeedModule).toBeTruthy();
  });
});
