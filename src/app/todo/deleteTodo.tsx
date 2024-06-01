"use client";
import { useState} from "react";
import { useRouter } from "next/navigation";
import { todoItems } from "@prisma/client";
import axios from "axios";

const DeleteTodo = ({ todoItem }: { todoItem: todoItems }) => {
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	// toggle modal
	const handleModal = () => {
		setShowModal(!showModal);
	};

	const handleDeleteToDoItem = async (todoId: number) => {
		setIsLoading(true);
		await axios.delete(`/api/todo/${todoId}`);
		setIsLoading(false);
		router.refresh();
		setShowModal(false);
	};

	return (
		<>
			{/* START Button Modal */}
			<button
				onClick={handleModal}
				className="text-white lg:ml-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				type="button"
			>
				Delete
			</button>
			{/* END Button Modal */}

			{/* <!-- START Main Modal --> */}
			<div className={showModal ? "" : "hidden"}>
				<div
					aria-hidden="true"
					className="overflow-y-auto flex  overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full h-full md:inset-0  bg-black bg-opacity-20"
				>
					<div className="relative p-4 w-full max-w-2xl max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<div className="p-4 md:p-5 space-y-4">
								<p className="mb-2 text-gray-500 text-lg dark:text-gray-300 text-center">
									Are you sure you want to delete this todo?
								</p>
							</div>

							<div className="flex justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
								<button
									data-modal-hide="default-modal"
									type="button"
									onClick={handleModal}
									className="mx-1 py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								>
									Cancel
								</button>
								{!isLoading ? (
									<button
										data-modal-hide="default-modal"
										type="button"
										onClick={() => handleDeleteToDoItem(todoItem.id)}
										className="mx-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
									>
										Delete
									</button>
								) : (
									<button
										disabled
										type="button"
										className="mx-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center"
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
										Deleting...
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- END Main Modal --> */}
		</>
	);
};

export default DeleteTodo;
