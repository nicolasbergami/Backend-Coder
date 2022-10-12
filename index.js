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

let usuario = new Usuario("Nicolas", "Bergami");
console.log(`El nombre completo del usuario es: ${usuario.getFullName()}.`);
usuario.addMascota("Gato");
usuario.addMascota("Perro Bulldog");
console.log(`Este usuario tiene ${usuario.countMascotas()} mascotas.`);
usuario.addBook("Don Quijote de la Mancha", "Miguel de Cervantes");
usuario.addBook("Los cuentos de Canterbury", "Geoffrey Chaucer");
usuario.addBook("Fisica ", "stewart");
console.log(`Libros del usuario: ${usuario.getBookNames()}`);