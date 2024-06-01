
import { Inter } from "next/font/google";
import prisma from "@/lib/prisma";
import AddTodo from "./addTodo";
import DeleteTodo from "./deleteTodo";
import EditTodo from "./editTodo";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";


// Read all todo item 
const fetchTodoItems = async () => {
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

export default async function Todo() {
	const [todoItems] = await Promise.all([fetchTodoItems()]);

	return (
		<main className={`min-h-screen p-5 md:p-24 ${inter.className}`}>
			<div>
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
					To Do List
				</h1>
				{/* Add TODO */}
				<AddTodo />
			</div>

			<div>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3 w-1/4">
								Title
							</th>
							<th scope="col" className="px-6 py-3 w-1/3 hidden md:table-cell">
								Description
							</th>
							<th scope="col" className="px-6 py-3 w-1/6">
								Status
							</th>
							<th scope="col" className="px-6 py-3 w-1/4">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{todoItems?.map((todoItem, index) => (
							<tr
								key={todoItem.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="px-6 py-4 truncate">{todoItem.title}</td>
								<td className="px-6 py-4 truncate hidden md:table-cell">
									{todoItem.description}
								</td>
								<td
									className={`px-6 py-4 ${
										todoItem.status === "new"
											? "text-blue-600"
											: todoItem.status === "in progress"
											? "text-yellow-600"
											: todoItem.status === "done"
											? "text-green-600"
											: todoItem.status === "canceled"
											? "text-gray-600"
											: "text-red-600"
									}`}
								>
									{todoItem.status}
								</td>
								<td className="px-6 py-4">
									<EditTodo todoItem={todoItem} />
									<DeleteTodo todoItem={todoItem} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
