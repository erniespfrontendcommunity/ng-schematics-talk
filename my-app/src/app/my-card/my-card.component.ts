import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-my-card',
    template: `
<mat-card class="dashboard-card">
    <mat-card-header>
        <mat-card-title>
            My awesome card!
        </mat-card-title>
    </mat-card-header>
</mat-card>
    `
})
export class MyCardComponent {
}
