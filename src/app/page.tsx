import Image from "next/image";
import { database } from "@/db/database";
import {  bids as bidsSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
export default async function Home() {
  const bids = await database.query.bids.findMany();
  return (
    <main className=" container  p-12 mx-auto w-screen h-screen">
      <form action={async (formData: FormData) => {
        "use server"
        const bid = formData.get("bid") as string;
        
        await database.insert(bidsSchema).values({});
        revalidatePath("/");

      }}>
        <Input type="number" name="bid" id="bid" placeholder="Bid" />
        <Button type="submit">Place Bid</Button>
      </form>
      <div className="">

      {
        bids.map((bid) => {
          return (
            <div className="" key={bid.id}>
              <p>{bid.id}</p>
            </div>
          );
        }
        )

      }
      </div>
    </main>
  );
}
