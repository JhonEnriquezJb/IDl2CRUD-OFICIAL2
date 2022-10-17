import { useEffect, useState } from "react";
import { axiosSinToken } from "../helpers/axios";


export const useClients = () => {
    const [isLoadingClient, setIsLoading] = useState(true)
    const [clients, setClient] = useState([]);
    useEffect(() => {
        getClients();
    }, [])

    const getClients = async () => {
        const resp = await axiosSinToken('/clients');

        if (!resp.ok) return setIsLoading(false);

        setClient(resp.clients);    
        setIsLoading(false);
    }
    return {
        isLoadingClient,
        clients,
    }
}
