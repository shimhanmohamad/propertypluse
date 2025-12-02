import { NextResponse } from "next/server";
import connectDB from "../../../../config/database";
import Property from "../../../../models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

//GET / api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = await params;
    const property = await Property.findById(id);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

//DELETE / api/properties/:id

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id } =await params; // ✔ Correct param name

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) { // ✔ Correct condition
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;

    const property = await Property.findById(id);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    // ✔ Verify owner
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

