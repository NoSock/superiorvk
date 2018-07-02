import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-general',
  templateUrl: './dashboard-general.component.html',
  styleUrls: ['./dashboard-general.component.less']
})
export class DashboardGeneralComponent implements OnDestroy {
  tabs = [
    'feed',
    'messages',
  ];
  currentPath: string;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.subscriptions.push(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => this.updateActiveTab())
    );
  }

  updateActiveTab() {
    const children = this.route.snapshot.children;
    try {
      this.currentPath = children[0].url[0].path;
    } catch (error) {
      this.currentPath = 'feed';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe()
    );
  }

}
