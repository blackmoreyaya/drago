
import { InfoADireccion } from './infoADireccion.model';
import { InfoAPersonal } from './infoAPersonal.model';

export class Agremiado {

    constructor(
        public nombre: string,
        public personal?: InfoAPersonal,
        public direccion?: InfoADireccion
    ) { }

}
