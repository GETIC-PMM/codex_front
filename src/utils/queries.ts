import { useQuery } from 'react-query'
import { BASE_URL_API } from './consts'
import axios from 'axios'; 

export const useTreinamento = ({ headers }: { headers: any }) =>
    useQuery({
        queryKey: ['treinamentos'],
        queryFn: async () => {
            const { data } = await axios.get<[]>(
                `${BASE_URL_API}/treinamentos`,
                {
                    headers,
                }
            )
            return data
        },
        refetchOnWindowFocus: false,
    })