// components/UserSection.jsx
import { useState } from "react";
import UserTable from "./UserTable";

const ITEMS_PER_PAGE = 5;

const UserSection = ({ title, users, showApprove, onApprove, onDelete, backUserRole }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-2xl font-semibold ${showApprove ? 'text-yellow-600' : 'text-green-700'}`}>
          {title} ({users.length})
        </h3>
        {users.length > ITEMS_PER_PAGE && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <UserTable
          users={paginatedUsers}
          showApprove={showApprove}
          onApprove={onApprove}
          onDelete={onDelete}
          backUserRole={backUserRole}
        />
      )}
    </div>
  );
};

export default UserSection;
