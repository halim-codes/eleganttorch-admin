"use client";
import { useLocale } from "@/context/LocaleContext";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useCommunicationRequests } from "@/hooks/useCommunicationRequests";
import Select from "../form/Select";
import { CommunicationRequest, RequestStatus } from "@/types/CommunicationRequest";
import { EyeIcon } from "@/icons";
import { useState } from "react";
import ShowModal from "./ShowModal";



const getStatusClass = (status: string) => {
    switch (status) {
        case "في الانتظار":
            return "text-center text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-600";
        case "جاري العمل عليه":
            return "text-center text-blue-800 border-blue-300 bg-blue-50 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-600";
        case "تم الانتهاء":
            return "text-center text-green-800 border-green-300 bg-green-50 dark:bg-green-800 dark:text-green-100 dark:border-green-600";
        default:
            return "text-center text-gray-700 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600";
    }
};




export const CommunicationRequestsComponent = () => {
    const { requests, loading, error, refetch, update } = useCommunicationRequests();
    const { messages } = useLocale();
    const [showModalOpen, setShowModalOpen] = useState(false);
    const [communicationToShow, setcCommunicationToShow] = useState<CommunicationRequest | null>(null);



    const handleStatusChange = async (id: string, newStatus: RequestStatus) => {
        await update(id, { status: newStatus });
        refetch();
    };
    const handleShow = (communication: CommunicationRequest) => {
        setcCommunicationToShow(communication);
        setShowModalOpen(true);

    };
    const closeShowModal = () => {
        setcCommunicationToShow(null);
        setShowModalOpen(false);
    };

    const statusOptions = [
        { value: "في الانتظار", label: messages["status_pending"] || "في الانتظار" },
        { value: "جاري العمل عليه", label: messages["status_in_progress"] || "جاري العمل عليه" },
        { value: "تم الانتهاء", label: messages["status_completed"] || "تم الانتهاء" },
    ];




    return (
        <>
            {
                communicationToShow && (
                    <ShowModal
                        isOpen={showModalOpen}
                        communication={communicationToShow}
                        onClose={closeShowModal}
                    />
                )
            }
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                {messages["nav_communication_requests"] || "Communication Requests"}
            </h3>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[800px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-1 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                        {messages["date"] || "Date"}
                                    </TableCell>
                                    <TableCell isHeader className="px-20 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                        {messages["status"] || "Status"}
                                    </TableCell>
                                    <TableCell isHeader className="pl-1 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                        {messages["name"] || "Name"}
                                    </TableCell>
                                    <TableCell isHeader className="px-1 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                        {messages["phone"] || "Phone"}
                                    </TableCell>
                                    <TableCell isHeader className="px-1 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                        {messages["message"] || "Message"}
                                    </TableCell>
                                    <TableCell isHeader className="px-1 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                        {messages["action"] || "Action"}
                                    </TableCell>
                                </TableRow>

                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {requests?.length > 0 &&
                                    requests.map((request) => (
                                        <TableRow key={request._id}>
                                            <TableCell className="px-10 py-4 text-gray-800 dark:text-white align-middle">
                                                {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "N/A"}
                                            </TableCell>
                                            <TableCell className="py-3 align-middle">
                                                <Select
                                                    options={statusOptions}
                                                    defaultValue={request.status}
                                                    onChange={(value: string) => handleStatusChange(request._id, value as RequestStatus)}
                                                    className={getStatusClass(request.status || "")}
                                                />
                                            </TableCell>

                                            <TableCell className="ps-15 py-4 text-gray-800 dark:text-white align-middle">
                                                {request.name}
                                            </TableCell>

                                            <TableCell className="px-20 py-4 text-gray-800 dark:text-white align-middle">
                                                {request.phone}
                                            </TableCell>
                                            <TableCell className="px-20 py-4 text-gray-800 dark:text-white align-middle">
                                                {request.message}
                                            </TableCell>
                                            <TableCell className="px-20 py-4 text-gray-800 dark:text-white align-middle">
                                                <button onClick={() => handleShow(request)} >
                                                    <EyeIcon />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
};
