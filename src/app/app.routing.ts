import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from "./error/error.component";
import { IdentityGuard } from "./services/identity.guard";
import { LoginGuard } from "./services/login.guard";
import { HomeComponent } from "./home/home.component";
import { HorariosComponent } from "./horarios/horarios.component";
import { VincularHorariosComponent } from "./vincular-horarios/vincular-horarios.component";
import { PermisosIngresoComponent } from "./permisos-ingreso/permisos-ingreso.component";
import { ReportesComponent } from "./reportes/reportes.component";
import { LoadingComponent } from "./loading/loading.component";

const appRoutes: Routes = [
    {path: '', component: LoginComponent, canActivate:[LoginGuard]},
    {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
    {path: 'logout/:sure', component:LoginComponent, canActivate: [IdentityGuard]},
    {path: 'home', component: HomeComponent, canActivate: [IdentityGuard]},
    {path: 'horarios', component: HorariosComponent, canActivate: [IdentityGuard]},
    {path: 'vincular_horarios', component: VincularHorariosComponent, canActivate: [IdentityGuard]},
    {path: 'permisos_ingreso', component: PermisosIngresoComponent, canActivate: [IdentityGuard]},
    {path: 'reportes', component: ReportesComponent, canActivate: [IdentityGuard]},
    {path: 'loading', component: LoadingComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] =[]
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)