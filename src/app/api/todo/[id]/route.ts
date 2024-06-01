import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { todoItems } from "@prisma/client";

// PUT /api/post
// Required fields in body: title, description, and status
export const PUT = async (
	request: Request,
	{ params }: { params: { id: string } }
) => {
	
	return NextResponse.json("1", { status: 200 });
};