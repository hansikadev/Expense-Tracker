import axios from "axios"

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://expense-tracker-wjwt.onrender.com/api/v2";

const api=axios.create({baseURL:BASE_URL,timeout:8000});

//expense apis
export const fetchExpenses=async()=>{
    const res=await api.get('/expense');
    return ( res.data  && res.data.data) || [];   
}

export const createExpenses=async(payload)=>{
    const res=await api.post('/expense', payload);
    return (res.data && res.data.data) || null;
}

export const updateExpenses=async(id,payload)=>{
    const res= await api.put(`/expense/${id}`,payload);
    return ( res.data  && res.data.data) || [];   
}

export const deleteExpenses=async(id,payload)=>{
    const res= await api.delete(`/expense/${id}`);
    return ( res.data ) || null;   
}
