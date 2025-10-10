'use server';
import { auth } from "@clerk/nextjs/server";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
    const textValue = formData.get('text');
    const amountValue = formData.get('amount');

    // Check for input  value
    if (!textValue || textValue === '' || !amountValue) {
        return { error: 'Text or amount is missing' };
    }

    const text: string = textValue.toString(); // ensure text is a string
    const amount: number = parseFloat(amountValue.toString()); //Parse amount as  number

    //Get logged in user
    const { userId } = auth();

    const transactionData: TransactionData = {
        text,
        amount
    };
    return { data: transactionData };
}

export default addTransaction