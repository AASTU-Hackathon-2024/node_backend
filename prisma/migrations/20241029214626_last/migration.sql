-- AddForeignKey
ALTER TABLE "bnpl" ADD CONSTRAINT "bnpl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bnpl" ADD CONSTRAINT "bnpl_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;
