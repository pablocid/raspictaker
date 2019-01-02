import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {SharedModule} from '../../app/modules';
import {HomeRoutingModule} from './home.router';

@NgModule({
    imports: [
        HomeRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
