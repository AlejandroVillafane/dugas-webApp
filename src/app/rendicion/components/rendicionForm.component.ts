import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ProductoService } from "../../productos/services/producto.service";
import { Producto } from "../../productos/models/producto";
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { Rendicion } from "../models/rendicion";
import { Banco } from "../../bancos/models/banco";
import { BancoService } from "../../bancos/services/banco.service";
import { TarjetaService } from "../../tarjetas/services/tarjeta.service";
import { Tarjeta } from "../../tarjetas/models/tarjeta";
import { RendicionConTransferencia } from "../models/rendicionConTransferencia";
import { RendicionCuentaDni } from "../models/rendicionCuentaDni";
import { RendicionMercadoPago } from "../models/rendicionMercadoPago";
import { RendicionOtros } from "../models/rendicionOtros";
import { RendicionTDTC } from "../models/rendicionTDTC";
import { RendicionCheque } from "../models/rendicionCheque";
import { Egreso } from "../models/egreso";
import { RendicionYPF } from "../models/rendicionYPF";
import { Billete } from "../../billetes/components/models/billete";
import { OtroIngreso } from "../models/otroIngreso";
import { RendicionService } from "../services/rendicion.service";
import { CommonModule } from "@angular/common";
import { CurrencyFormat } from "../../util/currencyFormat";
import { ConceptoService } from "../../conceptos/services/concepto.service";
import { Concepto } from "../../conceptos/models/concepto";
import { Rubro } from "../../rubros/models/rubro";
import { Legajo } from "../../legajos/models/legajo";
import { LegajoService } from "../../legajos/services/legajo.service";
import { Observable, map, startWith } from "rxjs";
import { BrowserModule } from "@angular/platform-browser";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Movil } from "../../moviles/models/movil";
import { MovilService } from "../../moviles/services/movil.service";
import { ModalComponent } from "./modal.component";
import { ConductorFormComponent } from "./conductorForm.component";
import { Usuario } from "../../usuarios/models/usuario";
import { TipoProducto } from "../../tipoProducto/models/tipoProducto";
import { RendicionProducto } from "../models/rendicionProducto";
import { ModalMensajeComponent } from "./modalMensaje.component";
import { Router } from "@angular/router";
import { IngresoACuenta } from "../models/ingresoACuenta";
import { BilleteService } from "../../billetes/services/billete.service";

@Component({
    selector:'rendicionForm-component',
    standalone:true,
    templateUrl:'rendicionForm.component.html',
    imports:[
        FormsModule,
        CurrencyFormat,
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        ModalComponent,
        ConductorFormComponent,
        ModalMensajeComponent
    ],
    styleUrl:"rendicionForm.component.css"
})
export class RendicionFormComponent implements OnInit{
    
    legajoHabilitado:boolean=true
    legajoAcomHabilitado:boolean=true
    movilHabilitado:boolean=true

    flagDiferenciasEfectivo:number = 0;
    productos : Producto[] = [];
    rendicion : Rendicion = new Rendicion();

    //rendicionBillete : Billete = {id:1,order:1,importe:10}

    rendicionBilleteList : any[] = []

    fechaRendicion:Date = new Date();
    diferenciaRendicion:number = 0;

    otroIngreso : OtroIngreso = new OtroIngreso();
    otroIngresoList : OtroIngreso[] = [];

    otrosIngresos : number = 0;
    ingresosACuentaEmisor : number = 0;

    rendicionConTransferencia : RendicionConTransferencia = new RendicionConTransferencia();
    rendicionConTransferenciaList : RendicionConTransferencia[] = []

    rendicionCuentaDni : RendicionCuentaDni = new RendicionCuentaDni();
    rendicionCuentaDniList : RendicionCuentaDni[] = []

    rendicionMercadoPago : RendicionMercadoPago = new RendicionMercadoPago();
    rendicionMercadoPagoList : RendicionMercadoPago[] = []

    rendicionOtros : RendicionOtros = new RendicionOtros();
    rendicionOtrosList : RendicionOtros[] = []

    rendicionTDTC : RendicionTDTC = new RendicionTDTC();
    rendicionTDTCList : RendicionTDTC[] = []

    rendicionCheque : RendicionCheque = new RendicionCheque();
    rendicionChequeList : RendicionCheque[] = []

    rendicionYPF : RendicionYPF = new RendicionYPF();
    rendicionYPFList : RendicionYPF[] = []

    egreso : Egreso = new Egreso();
    egresoList : Egreso[] = []

    totalEgresos : number = 0;

    bancos : Banco[] = [];
    tarjetas : Tarjeta[] = [];
    conceptoList : Concepto[] = [];
    tiposProducto:TipoProducto[] = [];
    ingresoACuentaPendientesList:IngresoACuenta[]=[]
    ingresoACuentaDestinoList:IngresoACuenta[]=[]
    ingresoACuentaDestinoTotal = 0;
    ingresoACuentaEmisor:IngresoACuenta=new IngresoACuenta();
    ingresoACuentaEmisorList:IngresoACuenta[]=[]
    
    legajo:Legajo = new Legajo();
    legajoAcom:Legajo = new Legajo();
    movil:Movil = new Movil();
    usuario:Usuario = new Usuario();
   
    totalCantidadProductoVendido : number = 0;
    totalCantidadKgProductoVendido : number = 0;

    popUp: boolean = false;
    mensaje:string = "";
    respuesta: boolean = false;

    popUpModalMensaje: boolean = false;
    modalMensaje:string = "Mensaje por defecto";
    respuestaModalMensaje: boolean = false;

    groupedProductos: any[] = [];

    rendicionProductos : RendicionProducto[] = [];
    totalCantidadesProducto:number = 0;
    totalKgProducto:number = 0;
    
    @ViewChild(ConductorFormComponent) conductorFormComponent!: ConductorFormComponent;
    @ViewChild('fechaRendicionInput') fechaRendicionInput!: ElementRef;  
    @ViewChild('egresosInput') egresosInput!: ElementRef;  
    @ViewChild('otrosIngresosInput') otrosIngresosInput!: ElementRef;  
    @ViewChild('clienteTRansferencia') clienteTRansferencia!: ElementRef;
    @ViewChild('cuentaDniCliente') cuentaDniCliente!: ElementRef;
    @ViewChild('mercadoPagoCliente') mercadoPagoCliente!: ElementRef;
    @ViewChild('tarjetaClienteInput') tarjetaClienteInput!: ElementRef;
    @ViewChild('otrosCliente') otrosCliente!: ElementRef;
    @ViewChild('ypfCliente') ypfCliente!: ElementRef;
    @ViewChild('chequeCliente') chequeCliente!: ElementRef;
    constructor(
        private productoService:ProductoService,
        private bancoService : BancoService,
        private tarjetaService : TarjetaService,
        private rendicionService : RendicionService,
        private conceptoService : ConceptoService,
        private legajoService : LegajoService,
        private movilService : MovilService,
        private router : Router,
        private billeteService : BilleteService
        
    ){}

    ngOnInit(): void {
        

        this.productoService.listarProductos().subscribe(productos=>{
            this.productos = productos;
            this.groupProductosByTipoProducto();
        });
        
        this.bancoService.listarBancos().subscribe(bancos=>this.bancos = bancos);

        this.tarjetaService.listarTarjetas().subscribe(tarjetas=>this.tarjetas = tarjetas);

        this.conceptoService.listarConceptos().subscribe(conceptos=>{
            this.conceptoList = conceptos
        });

        this.rendicionService.listarIngresoACuenta().subscribe(ingresos=>{
            this.ingresoACuentaPendientesList = ingresos;
        })

        this.billeteService.listarBilletes().subscribe(response=>{
            response.forEach(billete=>{
                this.rendicionBilleteList.push(
                    {
                        billete : billete,
                        cantidad : 0,
                        total : 0
                    }
                );
            });
        });
    }

    groupProductosByTipoProducto() {
        const grouped = this.productos.reduce((acc, producto) => {
            const tipoProductoId = producto.tipoProducto.id;
            if (!acc[tipoProductoId]) {
                acc[tipoProductoId] = {
                    tipoProducto: producto.tipoProducto,
                    productos: [],
                    cantidad:0
                };
            }
            acc[tipoProductoId].productos.push(producto);
            return acc;
        }, {} as { [key: number]: { tipoProducto: TipoProducto, productos: Producto[] , cantidad: number} });

        this.groupedProductos = Object.values(grouped);
    }

    agregarLegajo(legajo:Legajo){
        this.rendicion.legajo = legajo;
    }

    agregarLegajoAcom(legajo:Legajo){
        this.rendicion.legajoAcom = legajo;
    }

    agregarMovil(movil:Movil){
        this.rendicion.movil = movil;
    }

    focusInput(value:string): void {
        console.log(value)
        if(value == "otrosIngresosInput"){
            console.log(1)

            this.otrosIngresosInput.nativeElement.focus();  // Método para hacer foco en el input
        }else if(value == "egresosInput"){
            console.log(2)
            this.egresosInput.nativeElement.focus();  // Método para hacer foco en el input

        }
    }
    
    closeModalMensaje(value:boolean){
        if(value){
            this.popUpModalMensaje = false; // Close the modal
            this.router.navigate(['rendicionForm']);
        }
    }

    handleModalResponse(value: boolean) {
        //this.rendicion.egresos.push();
        this.respuesta = value;
        if(value){
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
    
            if(this.diferenciaRendicion > 0){
                
                this.egresoList.push({
                    tipoComprobante:"x",
                    numeroComprobante : 0,
                    proveedor : this.rendicion.legajo.apellido+" "+this.rendicion.legajo.nombre,
                    conceptoPago : this.conceptoList.filter(concepto=>concepto.id == 1)[0],
                    observacion:"Diferencia de rendicion",
                    importe : this.diferenciaRendicion
                })
                this.calcularTotalOperacion("egresos")
                this.actualizarTotalEfectivo();
                
                this.focusInput("egresosInput");
                //return
            }else if(this.diferenciaRendicion < 0){
                //this.popUp = true;
                this.otroIngresoList.push({
                    cliente:"Legajo "+this.rendicion.legajo.numeroLegajo,
                    concepto : this.conceptoList.filter(concepto=>concepto.id == 1)[0],
                    observacion:"Diferencia de rendicion",
                    importe : this.diferenciaRendicion*-1
                })
                this.calcularTotalOperacion("otroIngreso")
                this.actualizarTotalEfectivo();
                this.focusInput("otrosIngresosInput");
                //return
            }
        }
        this.popUp = false; // Close the modal
    }
    
    actualizarvalores(productoRendicion: any, groupedProductos:any):void{
        
        this.rendicionProductos = [];
        for(var c = 0;c<groupedProductos.length;c++){
            groupedProductos[c].cantidad = 0;
            for(var c2=0;c2<groupedProductos[c].productos.length;c2++){
                this.rendicionProductos.push({
                    cantidad:(groupedProductos[c].productos[c2].cantidad == undefined ? 0 : groupedProductos[c].productos[c2].cantidad),
                    producto : {
                        id:groupedProductos[c].productos[c2].id,
                        tipoEnvase:groupedProductos[c].productos[c2].tipoEnvase,
                        tipoProducto:groupedProductos[c].productos[c2].tipoProducto
                    }
                })
                if(groupedProductos[c].productos[c2].cantidad != undefined){
                    groupedProductos[c].cantidad += groupedProductos[c].productos[c2].cantidad * groupedProductos[c].productos[c2].tipoEnvase.capacidad
                }
            }
        }
        this.totalCantidadesProducto = 0;
        this.totalKgProducto=0;
        this.rendicionProductos.forEach(rendicion=>{
            this.totalCantidadesProducto +=rendicion.cantidad;
            this.totalKgProducto += (rendicion.cantidad*rendicion.producto.tipoEnvase.capacidad);
        })
    }

    actualizarRendicionBillete(order:number):void{
        
       
       var totalImporteBilletes = 0;
        this.rendicionBilleteList.forEach(
            billete => {
                if(billete.billete.order == order){
                    billete.total = billete.cantidad * billete.billete.importe
                }
                totalImporteBilletes = totalImporteBilletes + +billete.total
            }
        )
        
        if(totalImporteBilletes == this.rendicion.totalEfectivo){
            this.flagDiferenciasEfectivo = 0;
        }else if(totalImporteBilletes > this.rendicion.totalEfectivo){
            this.flagDiferenciasEfectivo = 1;
        }else if(totalImporteBilletes < this.rendicion.totalEfectivo){
            this.flagDiferenciasEfectivo = -1;
        }

        
        this.calcularDiferenciaRendicion();
    }

    calcularDiferenciaRendicion(){
        this.rendicion.totalEfectivo = this.rendicion.ventaContado - this.rendicion.totalNoEfectivo + this.otrosIngresos + this.ingresosACuentaEmisor - this.totalEgresos - this.ingresoACuentaDestinoTotal;
        var totalImporteBilletes = 0;
        this.rendicionBilleteList.forEach(
            billete => {
                
                totalImporteBilletes = totalImporteBilletes + +billete.total
            }
        )
        this.diferenciaRendicion = this.rendicion.totalEfectivo - totalImporteBilletes;
    }
    
    actualizarTotalEfectivo():void{
        this.rendicion.totalEfectivo = this.rendicion.ventaContado - this.rendicion.totalNoEfectivo + this.otrosIngresos + this.ingresosACuentaEmisor - this.totalEgresos - this.ingresoACuentaDestinoTotal;
        
        if(this.rendicion.totalEfectivo < 0){
            this.flagDiferenciasEfectivo = 1;
        }else if(this.rendicion.totalEfectivo > 0){
            this.flagDiferenciasEfectivo = -1;
        }else if(this.rendicion.totalEfectivo == 0){
            this.flagDiferenciasEfectivo = 0;
        }
        this.calcularDiferenciaRendicion();
    }
        
    agregarRendicionTransferencia() : void {
        this.rendicionConTransferenciaList = [
            ... this.rendicionConTransferenciaList,
            {... this.rendicionConTransferencia}
        ]
        this.rendicionConTransferencia = new RendicionConTransferencia();
        this.calcularTotalOperacion("transferencia")
        this.clienteTRansferencia.nativeElement.focus();
    }

    eliminarRendicionTransferencia(index:number):void{
        
        this.rendicionConTransferenciaList = this.rendicionConTransferenciaList.filter((rendicion,i)=>i!=index)
        this.calcularTotalOperacion("transferencia")
        this.clienteTRansferencia.nativeElement.focus();
    }

    agregarRendicionCuentaDni() : void {
        this.rendicionCuentaDniList = [
            ... this.rendicionCuentaDniList,
            {... this.rendicionCuentaDni}
        ]
        this.rendicionCuentaDni = new RendicionCuentaDni();
        this.calcularTotalOperacion("cuentaDni")
        this.cuentaDniCliente.nativeElement.focus();
        
    }

    eliminarRendicionCuentaDni(index:number):void{
        this.rendicionCuentaDniList = this.rendicionCuentaDniList.filter(
            (rendicion,i)=>{
                return i!=index
            }
        )
        this.calcularTotalOperacion("cuentaDni");
        this.cuentaDniCliente.nativeElement.focus();
    }

    agregarRendicionMercadopago() : void {
        this.rendicionMercadoPagoList = [
            ... this.rendicionMercadoPagoList,
            {... this.rendicionMercadoPago}
        ]
        this.rendicionMercadoPago = new RendicionMercadoPago();
        this.calcularTotalOperacion("mercadoPago")
        this.mercadoPagoCliente.nativeElement.focus();
    }

    eliminarRendicionMercadoPago(index:number):void{
        this.rendicionMercadoPagoList = this.rendicionMercadoPagoList.filter(
            (rendicion,i)=>{
                return i!=index
            }
        )
        this.calcularTotalOperacion("mercadoPago");
        this.mercadoPagoCliente.nativeElement.focus();
    }

    agregarRendicionOtros() : void {
        this.rendicionOtrosList = [
            ... this.rendicionOtrosList,
            {... this.rendicionOtros}
        ]
        this.rendicionOtros = new RendicionOtros();
        this.calcularTotalOperacion("otros")
        this.otrosCliente.nativeElement.focus();
    }

    eliminarRendicionOtros(index:number):void{
        this.rendicionOtrosList = this.rendicionOtrosList.filter(
            (rendicion,i)=>{
                return i!=index
            }
        )
        this.calcularTotalOperacion("otros");
        this.otrosCliente.nativeElement.focus();
    }

    agregarRendicionTDTC() : void {
        this.rendicionTDTCList = [
            ... this.rendicionTDTCList,
            {... this.rendicionTDTC}
        ]
        this.rendicionTDTC = new RendicionTDTC();
        this.calcularTotalOperacion("tdtc")
        this.tarjetaClienteInput.nativeElement.focus();
    }

    eliminarRendicionTDTC(index:number):void{
        this.rendicionTDTCList = this.rendicionTDTCList.filter(
            (rendicion,i)=>{
                return i!=index
            }
        )
        this.calcularTotalOperacion("tdtc");
        this.tarjetaClienteInput.nativeElement.focus();
    }
    
    agregarRendicionCheque() : void {
        this.rendicionChequeList = [
            ... this.rendicionChequeList,
            {... this.rendicionCheque}
        ]
        this.rendicionCheque = new RendicionCheque();
        this.calcularTotalOperacion("cheque")
        this.chequeCliente.nativeElement.focus();
    }

    eliminarRendicionCheque(index:number):void{
        this.rendicionChequeList = this.rendicionChequeList.filter(
            (rendicion,i)=>{
                return i!=index
            }
        )
        this.calcularTotalOperacion("cheque");
        this.chequeCliente.nativeElement.focus();
    }

    agregarEgreso() : void {
        console.log(this.egreso)
        this.egresoList = [
            ... this.egresoList,
            {... this.egreso}
        ]
        this.egreso = new Egreso();
        this.calcularTotalOperacion("egresos")
        this.actualizarTotalEfectivo();
    }

    eliminarEgreso(index:number):void{
        this.egresoList = this.egresoList.filter(
            (rendicion,i)=>{
                return i!=index
            }
        )
        this.calcularTotalOperacion("egresos");
        this.actualizarTotalEfectivo();
    }

    agregarRendicionYPF() : void {
        this.rendicionYPFList = [
            ... this.rendicionYPFList,
            {... this.rendicionYPF}
        ]
        this.rendicionYPF = new RendicionYPF();
        this.calcularTotalOperacion("ypf")
        this.ypfCliente.nativeElement.focus();
    }

    eliminarRendicionYPF(index:number):void{
        this.rendicionYPFList = this.rendicionYPFList.filter(
            (rendicion,i)=>{
                return i!=index
            }
        )
        this.calcularTotalOperacion("ypf");
        this.ypfCliente.nativeElement.focus();
    }

    agregarOtroIngreso() : void {
        this.otroIngresoList = [
            ... this.otroIngresoList,
            {... this.otroIngreso}
        ]
        this.otroIngreso = new OtroIngreso();
        this.calcularTotalOperacion("otroIngreso")
        this.actualizarTotalEfectivo();
        this.otrosIngresosInput.nativeElement.focus();
    }

    eliminarOtroIngreso(index:number):void{
        this.otroIngresoList = this.otroIngresoList.filter(
            (rendicion,i)=>{
                return i!=index
            }
        )
        this.calcularTotalOperacion("otroIngreso");
        this.actualizarTotalEfectivo();
    }

    agregarIngresoACuentaEmisor():void{
        this.ingresoACuentaEmisorList = [
            ... this.ingresoACuentaEmisorList,
            {... this.ingresoACuentaEmisor}
        ]
        this.ingresoACuentaEmisor = new IngresoACuenta();
        this.calcularTotalOperacion("ingresoACuentaEmisor")
        this.actualizarTotalEfectivo();
        //this.otrosIngresosInput.nativeElement.focus();
    }

    eliminarIngresoACuentaEmisor(index:number):void{
        this.ingresoACuentaEmisorList = this.ingresoACuentaEmisorList.filter(
            (ingreso,i)=>{
                return i!=index
            }
        )
        this.ingresoACuentaEmisor = new IngresoACuenta();
        this.calcularTotalOperacion("ingresoACuentaEmisor")
        this.actualizarTotalEfectivo();
        //this.otrosIngresosInput.nativeElement.focus();
    }

    calcularTotalOperacion(entidad:string) : void{
        
        if(entidad == "transferencia"){
            this.rendicion.ventaTransferencia = 0;
                this.rendicionConTransferenciaList.forEach(
                    rendicion =>{
                        this.rendicion.ventaTransferencia = this.rendicion.ventaTransferencia + +rendicion.importe
                    }
                )
        }
        if(entidad == "cuentaDni"){
            this.rendicion.ventaCuentaDNI = 0;
                this.rendicionCuentaDniList.forEach(
                    rendicion =>{
                        this.rendicion.ventaCuentaDNI = this.rendicion.ventaCuentaDNI + +rendicion.importe
                    }
                )
        }
        if(entidad == "mercadoPago"){
            this.rendicion.ventaMercadoPago = 0;
                this.rendicionMercadoPagoList.forEach(
                    rendicion =>{
                        this.rendicion.ventaMercadoPago = this.rendicion.ventaMercadoPago + +rendicion.importe
                    }
                )
        }
        if(entidad == "tdtc"){
            this.rendicion.ventaTarjetaCredito = 0;
                this.rendicionTDTCList.forEach(
                    rendicion =>{
                        this.rendicion.ventaTarjetaCredito = this.rendicion.ventaTarjetaCredito + +rendicion.importe
                    }
                )
        }
        if(entidad == "otros"){
            this.rendicion.ventaOtros = 0;
                this.rendicionOtrosList.forEach(
                    rendicion =>{
                        this.rendicion.ventaOtros = this.rendicion.ventaOtros + +rendicion.importe
                    }
                )
        }
        if(entidad == "ypf"){
            this.rendicion.ventaAppYPF = 0;
                this.rendicionYPFList.forEach(
                    rendicion =>{
                        this.rendicion.ventaAppYPF = this.rendicion.ventaAppYPF + +rendicion.importe
                    }
                )
        }
        if(entidad == "cheque"){
            this.rendicion.ventaCheques = 0;
                this.rendicionChequeList.forEach(
                    rendicion =>{
                        this.rendicion.ventaCheques = this.rendicion.ventaCheques + +rendicion.importe
                    }
                )
        }
        if(entidad == "egresos"){
            this.totalEgresos = 0;
                this.egresoList.forEach(
                    rendicion =>{
                        this.totalEgresos = this.totalEgresos + +rendicion.importe
                    }
                )
        }
        if(entidad == "otroIngreso"){
            this.otrosIngresos = 0;
                this.otroIngresoList.forEach(
                    ingreso =>{
                        this.otrosIngresos = this.otrosIngresos + +ingreso.importe
                    }
                )
        }
        if(entidad == "ingresoACuentaEmisor"){
            this.ingresosACuentaEmisor = 0;
                this.ingresoACuentaEmisorList.forEach(
                    ingreso =>{
                        this.ingresosACuentaEmisor = this.ingresosACuentaEmisor + +ingreso.importe
                    }
                )
        }

        if(entidad == "ingresoACuentaDestino"){
            this.ingresoACuentaDestinoTotal = 0;
                this.ingresoACuentaDestinoList.forEach(
                    ingreso =>{
                        this.ingresoACuentaDestinoTotal = this.ingresoACuentaDestinoTotal + +ingreso.importe
                    }
                )
        }

        this.rendicion.totalNoEfectivo = 
            this.rendicion.ventaTransferencia + 
            this.rendicion.ventaCuentaDNI +
            this.rendicion.ventaMercadoPago + 
            this.rendicion.ventaTarjetaCredito +
            this.rendicion.ventaOtros +
            this.rendicion.ventaAppYPF +
            this.rendicion.ventaCheques ;
        this.actualizarTotalEfectivo();
    }

    agregarIngresoACuentaPendiente(ingreso:IngresoACuenta,event: any):void{
        if (event.target.checked) {
            this.ingresoACuentaDestinoList.push(ingreso);
          } else {
            const index = this.ingresoACuentaDestinoList.indexOf(ingreso);
            if (index !== -1) {
              this.ingresoACuentaDestinoList.splice(index, 1);
            }
          }
        this.calcularTotalOperacion("ingresoACuentaDestino")
    }

    guardarRendicion(form : NgForm):void{
        
        if(this.diferenciaRendicion > 0){
            this.popUp = true;
            this.mensaje = "Hay un FALTANTE , se agregara como un EGRESO."
            return
        }else if(this.diferenciaRendicion < 0){
            this.mensaje = "Hay un SOBRANTE , se agregara como un INGRESO."
            this.popUp = true;
            return 
        }
        
        this.rendicion.productos = this.rendicionProductos;
        this.rendicion.transferencias = this.rendicionConTransferenciaList;
        this.rendicion.cuentaDNI = this.rendicionCuentaDniList;
        this.rendicion.mercadoPago = this.rendicionMercadoPagoList;
        this.rendicion.tarjetaCreditoDebito = this.rendicionTDTCList;
        this.rendicion.otros = this.rendicionOtrosList;
        this.rendicion.appYpf = this.rendicionYPFList;
        this.rendicion.cheques = this.rendicionChequeList;
        this.rendicion.ingresoACuentaEmisor = this.ingresoACuentaEmisorList;
        this.rendicion.ingresoACuentaDestino = this.ingresoACuentaDestinoList;
        this.rendicion.egresos = this.egresoList;
        this.rendicion.rendicionBilletes = this.rendicionBilleteList;
        this.rendicion.otrosIngresos = this.otroIngresoList;
        
        this.rendicionService.crearRendicion(this.rendicion).subscribe(response=>{
            this.modalMensaje = "La Rendicion se guardo con exito!"
            this.popUpModalMensaje = true;
            form.reset();
            this.reiniciarvariables();
            this.fechaRendicionInput.nativeElement.focus();
        })
        
    }

    reiniciarvariables():void{
        if (this.conductorFormComponent) {
            this.conductorFormComponent.resetVariables();
        }

        this.flagDiferenciasEfectivo = 0;
        this.rendicion  = new Rendicion();
    
        this.rendicionBilleteList.forEach(date=>{
            date.cantidad = 0;
            date.total = 0;
        })
    
        this.fechaRendicion = new Date();
        this.diferenciaRendicion = 0;
    
        this.otroIngreso  = new OtroIngreso();
        this.otroIngresoList  = [];
    
        this.otrosIngresos  = 0;
        this.ingresosACuentaEmisor  = 0;
    
        this.rendicionConTransferencia  = new RendicionConTransferencia();
        this.rendicionConTransferenciaList  = []
    
        this.rendicionCuentaDni  = new RendicionCuentaDni();
        this.rendicionCuentaDniList  = []
    
        this.rendicionMercadoPago  = new RendicionMercadoPago();
        this.rendicionMercadoPagoList  = []
    
        this.rendicionOtros  = new RendicionOtros();
        this.rendicionOtrosList  = []
    
        this.rendicionTDTC  = new RendicionTDTC();
        this.rendicionTDTCList  = []
    
        this.rendicionCheque  = new RendicionCheque();
        this.rendicionChequeList  = []
    
        this.rendicionYPF  = new RendicionYPF();
        this.rendicionYPFList  = []
    
        this.egreso  = new Egreso();
        this.egresoList  = []
    
        this.totalEgresos  = 0;
    
        this.ingresoACuentaPendientesList=[]
        this.ingresoACuentaDestinoList=[]
        this.ingresoACuentaDestinoTotal = 0;
        this.ingresoACuentaEmisor=new IngresoACuenta();
        this.ingresoACuentaEmisorList=[]
        
        this.legajo = new Legajo();
        this.legajoAcom = new Legajo();
        this.movil = new Movil();
        this.usuario = new Usuario();
       
        this.totalCantidadProductoVendido  = 0;
        this.totalCantidadKgProductoVendido  = 0;
    
        this.rendicionProductos  = [];
        this.totalCantidadesProducto = 0;
        this.totalKgProducto = 0;
    }
    
        
}