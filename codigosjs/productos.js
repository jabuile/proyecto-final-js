class Item {
    constructor(codigo, foto, nombre, precio){
        this.codigo = codigo;
        this.foto = foto;
        this.nombre = nombre;
        this.precio = precio;
    }

}

const item1 = new Item ("1", "https://indufer.com.ar/wp-content/uploads/2018/07/martillo-galponero-stanley-mango-de-fibra-profesional-51071-D_NQ_NP_960100-MLA27180556418_042018-F-1.jpg", "martillo", 1500);
const item2 = new Item ("2", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3M-aHlhKsLAhyAYkHWJRk523zNU5aa2Au-hQ25gyv4IST3a0OjrLqb6Hbs1LW0iZ_f8s&usqp=CAU","amoladora",8900);
const item3 = new Item ("3","https://adamimages.sbdinc.com/GEM/Dewalt/1000x1000_72r/DW508S_1.jpg","taladro", 7500);
const item4 = new Item ("4","https://pintureriasagitario.com.ar/wp-content/uploads/2020/08/Lijadora.jpg","lijadora", 6500);
const item5 = new Item ("5","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ZnzqLOB7jo2hyg1a7XplaYkC-zKvLQVqqSDGifiySjVFBnhlyK98mwmZUn0r99PkxL0&usqp=CAU", "sierra circular", 12000);
const item6 = new Item ("6", "https://www.bultor.com.ar/wp-content/uploads/2017/03/STHR1232K-AR.jpg","Rotomartillo", 18000);

const arrProductos =[];
arrProductos.push(item1);
arrProductos.push(item2);
arrProductos.push(item3);
arrProductos.push(item4);
arrProductos.push(item5);
arrProductos.push(item6);
