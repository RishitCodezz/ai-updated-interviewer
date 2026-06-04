import { getFirebaseServices } from "@/firebase/admin";

export async function POST(request: Request) {
  try {
    const { db } = getFirebaseServices();
    const { userId, transcript, type, createdAt } = await request.json();

    if (!userId || !transcript || transcript.length === 0) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save conversation to Firestore
    const conversation = {
      userId,
      transcript,
      type,
      createdAt,
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection("conversations").add(conversation);

    return Response.json(
      {
        success: true,
        conversationId: docRef.id,
        message: "Conversation saved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving conversation:", error);
    return Response.json(
      { success: false, error: "Failed to save conversation" },
      { status: 500 }
    );
  }
}
