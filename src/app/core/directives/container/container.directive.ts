import { ChangeDetectorRef, Directive, HostBinding } from '@angular/core';

import { distinctUntilChanged, map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfigService } from 'src/app/services/config.service';

@UntilDestroy()
@Directive({
  selector: '[vexContainer]',
})
export class ContainerDirective {
  @HostBinding('class.container') enabled: boolean;

  constructor(
    private configService: ConfigService,
    private cd: ChangeDetectorRef
  ) {
    this.configService.config$
      .pipe(
        map((config) => config.boxed),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe((boxed) => {
        this.enabled = boxed;
        this.cd.markForCheck();
      });
  }
}
