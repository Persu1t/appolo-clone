import { NextRequest, NextResponse } from "next/server";
import { firestoreDb } from "@/firebase/server";

export const POST = async (req)=>{
    const data = await req.json();
    console.log("Received data:", data);

    // Here you would typically add the data to your database
    // For demonstration, we're just returning the data back in the response
    const doctor = firestoreDb.collection("doctors").add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return NextResponse.json({ message: "Doctor added successfully!", id: doctor.id });
}