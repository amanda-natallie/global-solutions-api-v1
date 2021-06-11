export interface ICarProps {
    id?: number;
    foto?: string;
    modelo?: string;
    ano?: string;
    kmRodado?: string;
    placa?: string;
    dono?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ICarWashProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    photos: string;
    created_at: string;
    updated_at: string;
    
}