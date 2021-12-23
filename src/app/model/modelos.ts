export class Modelos {
}

//Parametros 
export class Tramite {
    id
    cod
    descripcion
}

export class SubTramite {
    id
    cod
    descripcion
}

export class Ticket {
    id
    cod
    descripcion
}

export class Area {
    id
    cod
    nombre
}
export class Usuario{
    id
    username
    password
    last_name
    first_name
}
export class Token{
    user
    token    
}
export class Ventanilla{
    id
    cod
    nombre
}
export class Oficina{
    id
    cod
    nombre
}
export class Cliente {
    id
    nit
    nombre
}
//Relacionados
export class TipoTramite{
    area:Area=new Area()
    tramite:Tramite=new Tramite()
    subTramite:SubTramite=new SubTramite()
}
export class Plataforma{
    area:Area=new Area()
    oficina:Oficina=new Oficina()    
}
export class Punto{
    id
    usuario:Usuario=new Usuario()
    ventanilla:Ventanilla=new Ventanilla()
    plataforma:Plataforma=new Plataforma()
}

export class TicketArea{
    area:Area=new Area()
    ticket:Ticket=new Ticket()    
}


//Auxiliares
export class Vector{
    id
}

//Base de Preguntas y respuestas

export class Base{
    id
    tema 
    estado_vigente 
    estado_actualizado 
    pregunta
    respuesta 
    respaldo_ley
    respaldo_ds 
    respaldo_rnd_ra 
    respaldo_otro
    datos_remitido
    datos_revisado 
    datos_aprobado_liberado 
    verificado_cite_gjnt 
    verificado_cite_gf 
    verificado_cite_gre
}


//Registros Diarios 
export class Atencion{
    cliente:Cliente = new Cliente()
    punto:Punto =new Punto()
    ticket:Ticket = new Ticket()
    correlativo:number
    inicio:string
    inicioHora:string
    finalHora:string
    modificado:Date = new Date()
    tipoAtencion=new Array<TipoTramite>()
}

export class AtencionTramite{
    atencion:Atencion = new Atencion()
    tipoTramite:TipoTramite = new TipoTramite()
    inicio:string
    inicioHora:string
    finalHora:string
    modificado:Date = new Date()


}

export class InicioHora{
    inicioHora        
}
