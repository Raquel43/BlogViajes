export class Autor {
    constructor(nif, nom, llinatges, naixement, rol){
        this.nif = nif;
        this.nom = nom;
        this.llinatges = llinatges;
        this.naixement = naixement;
        this.rol = rol;
    }

    render(){
        return `
        nif:${nif},
        nom:${nom},
        llinatges:${llinatges},
        naixement:${naixement},
        rol:${rol}
        
        `;
    }
}