

// declaramos nuestras variables como la esten en la bd 
export class producto {
codigo_prod : string;
titulo : string;
fecha : string;
precio :string;
tipo : string;
sinopsis :string;
imagen: string;
//las inicializamos en el constructor
constructor( codigo_prod: string, titulo : string, fecha : string, precio : string,tipo : string, sinopsis : string, imagen : string){
this.titulo = titulo;
this.fecha = fecha;
this.precio = precio;
this.tipo = tipo;
this.sinopsis = sinopsis;
this.imagen =  imagen;
this.codigo_prod =  codigo_prod;

}

}

export class busqueda{
    busqueda : string ;
    constructor(busqueda : string){
        this.busqueda = busqueda;

    }
}

export class LoginData{
    user : String ;
    password : String;

    constructor(user : string, password : string)
    {
    this.password = password;
    this.user = user;


    }
}


export class users{
    user: string;
    password : string;
    name : string;
    lastname: string;
    roleid: string
    constructor(user: string, password: string , name : string , lastname : string, roleid: string){
        this.user = user;
        this.password = password;
        this.name = name;
        this.lastname =lastname;
        this.roleid = roleid;

    }
}