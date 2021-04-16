import { RuvFormComponent } from './../ruv/ruv-form/ruv-form.component';
import { HomeComponent } from './home/home.component';
import { CoreComponent } from './core/core.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'ruv',
        loadChildren: ()=> import('../ruv/ruv.module').then((m) => m.RuvModule)
      },
      {
        path: 'visitor-entry',
        loadChildren: ()=> import('../visitor-entry/visitor-entry.module').then((m) => m.VisitorEntryModule)
      },
      // {
      //   path: 'visitor-egress',
      //   loadChildren: ()=> import ('../visitor-egress/visitor-egress.module').then((m) => m.VisitorEgressModule)
      // },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
