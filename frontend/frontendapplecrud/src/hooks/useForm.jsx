import { useState } from 'react';

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (newState = initialState ) => {
        setValues( newState );
    }

    const handleInputChange = (object) => {
        if (object?.target) {
            const {target} = object;
            return setValues({
                ...values,
                [ target.name ]: target.value
            });
        }
        setValues({
            ...values,
            [ object.name ]: object.value
        });
    }
    const handleSetValues = (setState = {}) => {
        setValues(setState)
    }

    return [ values, handleInputChange, reset, handleSetValues ];
}