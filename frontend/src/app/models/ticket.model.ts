export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    userId: string;
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
    creator?: {
        id: string;
        name: string;
        email: string;
    };
    assignee?: {
        id: string;
        name: string;
        email: string;
    };
    comments?: Comment[];
}

export interface Comment {
    id: string;
    content: string;
    userId: string;
    ticketId: string;
    createdAt: string;
    user?: {
        id: string;
        name: string;
    };
}