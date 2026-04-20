import { NextRequest, NextResponse } from "next/server";

const MOCK_REPLIES: Record<string, Array<{label: string; text: string}>> = {
  tweet: [
    { label: "Professional", text: "Massive congrats to XYZ Corp and the whole team! Shipping something this significant takes real dedication — enjoy this moment, you've all earned it." },
    { label: "Casual", text: "Three months of no sleep and you still shipped?? XYZ Corp absolutely went off. Huge congrats! 🎉" },
    { label: "Witty", text: "Zero sleep, full ship. XYZ Corp doing the most — congrats to the team! 🚀" },
  ],
  linkedin: [
    { label: "Professional", text: "Congratulations to XYZ Corp on reaching 1M users — a true testament to your team's customer focus. The best feedback we ever received was brutally honest and absolutely right." },
    { label: "Casual", text: "1M users is massive — congrats XYZ! And yes, the best feedback always stings a little but moves the needle the most." },
    { label: "Witty", text: "XYZ Corp hitting 1M users — love to see it! Best feedback I ever got: 'I use your product despite its UX.' Stung a little, shipped a lot." },
  ],
};

const INSTRUCTION_VARIANTS: Record<string, Record<string, Array<{label: string; text: string}>>> = {
  funny: {
    tweet: [
      { label: "Professional", text: "Truly inspiring work from XYZ Corp. The dedication shown here sets a new industry benchmark. 👏" },
      { label: "Casual", text: "Bro XYZ Corp ate and left no crumbs 😭🔥 congrats legends" },
      { label: "Witty", text: "XYZ Corp shipped while I can't even ship my groceries on time. Congrats! 📦" },
    ],
    linkedin: [
      { label: "Professional", text: "A remarkable milestone for XYZ Corp. Your commitment to user-centric development is truly commendable." },
      { label: "Casual", text: "1M users?! XYZ Corp really said 'hold my coffee' and delivered. Love this energy!" },
      { label: "Witty", text: "XYZ Corp: 1M users, 0 excuses. Meanwhile I'm still trying to get 10 people to open my newsletter 😅" },
    ],
  },
  short: {
    tweet: [
      { label: "Professional", text: "Well deserved, XYZ Corp. Congrats to the whole team!" },
      { label: "Casual", text: "XYZ Corp shipped!! Let's gooo 🔥" },
      { label: "Witty", text: "Sleep is overrated anyway. Congrats XYZ! 😴🚀" },
    ],
    linkedin: [
      { label: "Professional", text: "Congratulations XYZ Corp — 1M users is a fantastic milestone!" },
      { label: "Casual", text: "Huge congrats XYZ! Well deserved 🎉" },
      { label: "Witty", text: "1M users and counting. XYZ Corp, unstoppable! 💪" },
    ],
  },
};

function getReplies(platform: string, instruction: string) {
  const p = platform === "tweet" ? "tweet" : "linkedin";
  const instr = instruction.toLowerCase();
  if (instr.includes("funny") || instr.includes("humor") || instr.includes("joke")) {
    return INSTRUCTION_VARIANTS.funny[p];
  }
  if (instr.includes("short") || instr.includes("brief") || instr.includes("quick")) {
    return INSTRUCTION_VARIANTS.short[p];
  }
  return MOCK_REPLIES[p];
}

export async function POST(req: NextRequest) {
  const { platform, instruction } = await req.json();
  // Simulate a small delay so it feels like AI is thinking
  await new Promise(r => setTimeout(r, 900));
  const replies = getReplies(platform, instruction || "");
  return NextResponse.json({ replies, mode: "mock" });
}
