"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { todoItems } from "@prisma/client";
import axios from "axios";
import { stat } from "fs";

const EditTodo = ({ todoItem }: { todoItem: todoItems }) => {
	const [title, setTitle] = useState(todoItem.title);
	const [description, setDescription] = useState(todoItem.description);
	const [status, setStatus] = useState(todoItem.status);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	// toggle modal
	const handleModal = () => {
		setShowModal(!showModal);
	};

	// async function handle add todo list
	const handleEditToDoItem = async (todoId: Number) => {
		setIsLoading(true);
		await axios.put(`/api/todo/${todoId}`, {
			title: title,
			description: description,
			status: status,
		});
		setIsLoading(false);
		router.refresh();
		setShowModal(false);
	};

	return (
		<>
			{/* START Button Modal */}
			<button
				onClick={handleModal}
				className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center "
				type="button"
			>
				Edit
			</button>
			{/* END Button Modal */}

			{/* <!-- START Main Modal --> */}
			<div
				className={
					showModal
						? "overflow-y-auto flex  overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-20"
						: "hidden"
				}
			>
				<div className="relative p-4 w-full max-w-2xl max-h-full">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="p-4 md:p-5 space-y-4">
							<label
								htmlFor="title"
								className=" text-sm font-medium leading-6 text-gray-900"
							>
								Title
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<input
									type="text"
									name="title"
									id="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="title"
								/>
							</div>
							<label
								htmlFor="description"
								className=" text-sm font-medium leading-6 text-gray-900"
							>
								Description
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<textarea
									name="description"
									id="description"
									onChange={(e) => setDescription(e.target.value)}
									value={description}
									className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="description"
								/>
							</div>
							<label
								htmlFor="status"
								className=" text-sm font-medium leading-6 text-gray-900"
							>
								Status
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<select
									name="status"
									id="status"
									defaultValue={status}
									onChange={(e) => setStatus(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								>
									<option value="new">new</option>
									<option value="in progress">in progress</option>
									<option value="done">done</option>
									<option value="canceled">canceled</option>
								</select>
							</div>
						</div>

						<div className="flex justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								data-modal-hide="default-modal"
								type="button"
								onClick={handleModal}
								className="mx-1 border hover:text-blue-700  border-gray-200 text-black bg-gradient-to-br from-white to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-grey-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
							>
								Close
							</button>
							{!isLoading ? (
								<button
									type="button"
									onClick={() => handleEditToDoItem(todoItem.id)}
									className="mx-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
								>
									Save
								</button>
							) : (
								<button
									disabled
									type="button"
									className="mx-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 inline-flex items-center"
								>
									<svg
										aria-hidden="true"
										role="status"
										className="inline w-4 h-4 me-3 text-white animate-spin"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="#E5E7EB"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentColor"
										/>
									</svg>
									Saving...
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* <!-- END Main Modal --> */}
		</>
	);
};

export default EditTodo;
