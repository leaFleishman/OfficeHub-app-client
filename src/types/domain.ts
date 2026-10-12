// הטיפוסים    - להעתיק מהשרת (src/types/domain.ts + src/constants.ts)

export type Role = 'Employee' | 'Manager' | 'Admin';

export type InquiryStatus = 'Open' | 'InProgress' | 'Closed';

export type BookingStatus = 'Active' | 'Cancelled';

export interface loginModel{
     email: string;
     password:string
}

export interface User {
    id: number;
    companyId: number | null;
    name: string;
    email: string;
    phone: string | null;
    role: Role;
    isBlocked: boolean;
    createdAt: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface Company {
    id: number;
    name: string;
    floor: number | null;
    phone: string | null;
    createdAt: string;
}

export interface Room {
    id: number;
    name: string;
    capacity: number;
    floor: number;
    equipment: string[];
    createdAt: string;
}

export interface Booking {
    id: number;
    roomId: number;
    roomName: string;
    userId: number;
    userName: string | null;
    subject: string | null;
    start: string;
    end: string;
    status: BookingStatus;
    createdAt: string;
}

export interface Inquiry {
    id: number;
    userId: number;
    userName: string;
    subject: string;
    content: string;
    status: InquiryStatus;
    reply: string | null;
    handledBy: number | null;
    createdAt: string;
    updatedAt: string;
};

export type PageParams = { page: number; pageSize: number };

export type Page<T> = { items: T[]; total: number; page: number; pageSize: number };

