import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatTableModule,
    MatAutocompleteModule,
} from '@angular/material';

const Mds = [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatTableModule,
    MatAutocompleteModule
];

@NgModule({
    // imports: Mds,
    exports: Mds,
})
export class MaterialModule { }