import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { todoItems } from "@prisma/client";

// POST /api/post
// Required fields in body: title, description, and status
// Create TodoItems
export const POST = async (request: Request) => {
	const body: todoItems = await request.json();
	const todoItems = await prisma.todoItems.create({
		data: {
			title: body.title,
			description: body.description,
			status: body.status,
		},
	});
	return NextResponse.json(todoItems, { status: 201 });
};

// Read all todo item 
export const fetchTodoItems = async () => {
	const res = await prisma.todoItems.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			status: true,
			createdAt: true,
			updatedAt: true,
		},
		orderBy: {
			id: "asc",
		},
	});
	return res;
};