import { firestoreDb } from "@/firebase/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "3");

  // Filter values
  const gender = searchParams.get("gender");
  const language = searchParams.get("language");
  const minRating = parseFloat(searchParams.get("minRating") || "0");
  const maxFees = parseInt(searchParams.get("maxFees") || "10000");
  const experience = parseInt(searchParams.get("experience") || "0");

  try {
    let query = firestoreDb.collection("doctors");

    // Apply Firestore-supported filters
    if (gender) query = query.where("gender", "==", gender);
    if (minRating) query = query.where("rating", ">=", minRating);
    if (experience) query = query.where("experience", "<=", experience);
    if (maxFees) query = query.where("fees", "<=", maxFees);
    // Get the snapshot
    const snapshot = await query.get();

    // Apply array includes and pagination manually
    let allDoctors = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // For array fields like `language`, filter manually
    if (language) {
      allDoctors = allDoctors.filter((doctor) =>
        doctor.language?.includes(language)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedDoctors = allDoctors.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(allDoctors.length / limit);

    return NextResponse.json({
      doctors: paginatedDoctors,
      total: allDoctors.length,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
};