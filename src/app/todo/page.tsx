
import { SyntheticEvent } from "react";
import { Inter } from "next/font/google";
import type { todoItems } from "@prisma/client";
import prisma from "@/lib/prisma";
import AddTodo from "./addTodo";
const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";


const getTodoItems = async () => {
	const res = await prisma.todoItems.findMany();
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
								<td className="px-6 py-4">{todoItem.description}</td>
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
									<button
										data-modal-hide="default-modal"
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Edit
									</button>
									<button
										data-modal-hide="default-modal"
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mx-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
