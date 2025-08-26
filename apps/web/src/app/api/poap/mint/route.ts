import { NextRequest, NextResponse } from "next/server";
import { getPOAP } from "@/lib/poap";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { address, eventId, tokenURI } = await req.json();
  if (!address || !eventId || !tokenURI) {
    return NextResponse.json({ error: "address, eventId, tokenURI required" }, { status: 400 });
  }

  // Optional: authorize the user; require they attended eventId etc.
  // const user = await currentUser(); // Clerk
  // if (!user || !isAdmin(user)) return NextResponse.json({ error: "unauthorized" }, { status: 403 });

  const { contract } = getPOAP();
  const tx = await contract.mintTo(address, tokenURI);
  const receipt = await tx.wait();

  // store record
  const mint = await prisma.poAPMint.create({
    data: {
      userAddress: address,
      eventId,
      tokenURI,
      txHash: receipt?.hash ?? tx.hash,
    }
  });

  return NextResponse.json({ ok: true, txHash: tx.hash, id: mint.id });
}
