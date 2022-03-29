import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importar mis componentes
import { HomeComponent } from './components/home/home.component';
// Agregar mis rutas
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', component: HomeComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }