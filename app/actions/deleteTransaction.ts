'use server';

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteTransaction(transactionID: string): Promise<{
    message?: string;
    error?: string;
}> {
    const { userId } = await auth();

    if (!userId) {
        return { error: 'User not found' }
    }

    try {
        await db.transaction.delete({
            where: {
                id: transactionID,
                userId
            }
        });

        revalidatePath('/');

        return { message: 'Transaction delete' };
    } catch (error) {
        return { error: 'database error' };
    }
}

export default deleteTransaction;