// `ReimbursementInterface` 
export interface ReimbursementInterface {
    reimbursementId?: number;
    amount: number;
    description: string;
    status: 'Pending' | 'Approved' | 'Denied'; // Using a union of string literals for status
    userId: number; // Assuming every reimbursement is linked to a user
    dateSubmitted?: Date; // Optional date field added
}
