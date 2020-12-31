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


//Relacionados

export class TipoTramite{
    area:Area=new Area()
    tramite:Tramite=new Tramite()
    subTramite:SubTramite=new SubTramite()
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