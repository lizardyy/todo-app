
import { Inter } from "next/font/google";
import prisma from "@/lib/prisma";
import AddTodo from "./addTodo";
import DeleteTodo from "./deleteTodo";
import EditTodo from "./editTodo";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

const getTodoItems = async () => {
	const res = await prisma.todoItems.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			status: true,
		},
		orderBy: {
			id: "asc", // 'asc' for ascending order, 'desc' for descending order
		},
	});
	return res;
};

export default async function Todo() {
	const [todoItems] = await Promise.all([getTodoItems()]);

	return (
		<main className={`min-h-screen  p-24 ${inter.className}`}>
			<div>
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
					To Do List
				</h1>
				{/* Add TODO */}
				<AddTodo />
			</div>

			<div>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3 w-1/4">
								Title
							</th>
							<th scope="col" className="px-6 py-3 w-1/3">
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
								key={index}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="px-6 py-4">{todoItem.title}</td>
								<td className="px-6 py-4 ">{todoItem.description}</td>
								<td
									className={`px-6 py-4 ${
										todoItem.status === "done"
											? "text-green-600"
											: "text-red-600"
									}`}
								>
									{todoItem.status}
								</td>
								<td className="px-6 py-4">
									<EditTodo todoItem={todoItem}/>
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
