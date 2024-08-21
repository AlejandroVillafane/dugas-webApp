import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { RendicionComponent } from './rendicion/components/rendicion.component';
import { RendicionFormComponent } from './rendicion/components/rendicionForm.component';
import { ConceptoComponent } from './conceptos/components/concepto.component';
import { LegajoComponent } from './legajos/components/legajo.component';
import { MovilComponent } from './moviles/components/movil.component';
import { BancoComponent } from './bancos/components/banco.component';
import { TarjetaComponent } from './tarjetas/components/tarjeta.component';
import { ProductoComponent } from './productos/components/producto.component';
import { TipoEnvaseComponent } from './tipoEnvases/components/tipoEnvase.component';
import { TipoProductoComponent } from './tipoProducto/components/tipoProducto.component';
import { RubroComponent } from './rubros/components/rubro.component';
import { ShowRendicionComponent } from './rendicion/components/showRendicion/showRendicion.component';
import { EgresoComponent } from './egreso/components/egreso.component';
import { CobranzaComponent } from './cobranza/components/cobranza.component';
import { EgresoListComponent } from './egreso/components/egreso-list/egreso-list.component';
import { CobranzaListComponent } from './cobranza/components/cobranza-list/cobranza-list.component';

export const routes: Routes = [
    //{path:'',component:AppComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:RendicionComponent},
    {path:'abmLegajo',component:LegajoComponent},
    {path:'abmMovil',component:MovilComponent},
    {path:'abmBanco',component:BancoComponent},
    {path:'abmTarjeta',component:TarjetaComponent},
    {path:'abmProducto',component:ProductoComponent},
    {path:'abmTipoEnvase',component:TipoEnvaseComponent},
    {path:'abmTipoProducto',component:TipoProductoComponent},
    {path:'abmRubro',component:RubroComponent},
    {path:'abmConceptos',component:ConceptoComponent},
    {path:'rendiciones',component:RendicionComponent},
    {path:'rendicion',component:ShowRendicionComponent},
    {path:'rendicionForm',component:RendicionFormComponent},
    {path:'egresos',component:EgresoComponent},
    {path:'egresoList',component:EgresoListComponent},
    {path:'cobranzas',component:CobranzaComponent},
    {path:'cobranzaList',component:CobranzaListComponent}
];
