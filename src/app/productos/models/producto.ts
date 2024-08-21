import { TipoEnvase } from "../../tipoEnvases/models/tipoEnvase";
import { TipoProducto } from "../../tipoProducto/models/tipoProducto";

export class Producto{
    id!:number;
    tipoProducto!:TipoProducto;
    tipoEnvase!:TipoEnvase;
    //cantidadVendida!:number;
	//kgVendidos!:number;
    
}