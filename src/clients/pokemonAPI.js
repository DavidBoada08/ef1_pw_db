import axios from 'axios';


export const consumirAPI = async (id = 1) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
};

export async function consumiAPIFachada(id = 1) {
    return consumirAPI(id);
}