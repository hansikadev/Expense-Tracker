import axios from "axios"

const BASE_URL="http://localhost:8000/ap/v2"

const api=axios.create({baseURL:BASE_URL,timeout:8000});

//expense apis
export const fetchExpenses=async()=>{
    const res=await api.get('/expense');
    return ( res.data  && res.data.data) || [];   
}

export const createExpenses=async()=>{
    const res=await api.post('/expense');
    return ( res.data  && res.data.data) || [];   
}

export const updateExpenses=async(id,payload)=>{
    const res= await api.put(`/expense/${id}`,payload);
    return ( res.data  && res.data.data) || [];   
}

export const deleteExpenses=async(id,payload)=>{
    const res= await api.delete(`/expense/${id}`);
    return ( res.data ) || null;   
}
