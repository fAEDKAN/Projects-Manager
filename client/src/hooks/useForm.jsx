import { useState } from "react";

//éste hook servirá para trabajar con los datos del formulario
//inicializará como un objeto vacío
export const useForm = (initialState = {}) => {
    //valores del formulario
    const [formValues, setFormValues] = useState(initialState);
    //recibe un evento y desestructuramos 'target' que es donde sucede dicho evento
    const handleInputChange = ({ target }) => {
        setFormValues({
            //traemos todas las propiedades que tenga el estado
            ...formValues,
            //de cada input el hook tomará su atributo name para crear la clave (value)
            [target.name]: target.value,
        });
    };
    //retorna al estado inicial
    const reset = () => {
        setFormValues(initialState);
    };

    return {
        //retorna el estado del hook
        formValues,
        //los valores del estado contenidos en el hook
        handleInputChange,
        reset,
        setFormValues
    };
};
