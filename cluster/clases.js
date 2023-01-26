class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        (this.nombre=nombre);
        (this.apellido=apellido);
        (this.libros=libros || []);
        (this.mascotas = mascotas || []);
    }

    getFullName(){
        return  `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        return this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre,autor){
        this.libros.push({nombre,autor});
    }

    getBookNames(){
        return this.libros.map(({ nombre }) => nombre).join(", ");
    }
}

let usuario = new Usuario("Santiago", "Pedraza");
console.log(`El nombre de usuario es: ${usuario.getFullName()}.`);
usuario.addMascota("Perro blanco");
usuario.addMascota("Perro negro");
console.log(`Este usuario tiene ${usuario.countMascotas()} mascotas.`);
usuario.addBook("Vigilancia liquida", "Zygmunt Bauman");
usuario.addBook("Harry Potter", "Joanne Kathleen");
usuario.addBook("Calculo 1", "James Stewart.");
console.log(`Libros del usuario: ${usuario.getBookNames()}`);