import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: '../../pages/home/home.module#HomeModule' },
  // { path: 'analyzer', loadChildren: '../../pages/analyzer/analyzer.module#AnalyzerModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, errorHandler: ErrorRoutingHandler })],
  exports: [RouterModule],
})
export class AppRouterModule { }

export function ErrorRoutingHandler(e) {
    console.log('Error en el routing');

    console.log(e)
}

// export const routedComponents = [AppComponent];