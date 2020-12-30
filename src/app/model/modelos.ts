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
    area = Area
    tramite = Tramite
    subTramite = SubTramite
}