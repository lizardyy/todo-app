import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { todoItems } from "@prisma/client";

// PUT /api/post
// Required fields in body: title, description, and status
export const PUT = async (
	request: Request,
	{ params }: { params: { id: string } }
) => {
	const body: todoItems = await request.json();
	const todoItem = await prisma.todoItems.update({
		where: {
			id: Number(params.id),
		},
		data: {
			title: body.title,
			description: body.description,
			status: body.status,
		},
	});
	return NextResponse.json(todoItem, { status: 200 });
};

export const DELETE = async (
	request: Request,
	{ params }: { params: { id: string } }
) => {
	const product = await prisma.todoItems.delete({
		where: {
			id: Number(params.id),
		},
	});
	return NextResponse.json(product, { status: 200 });
};