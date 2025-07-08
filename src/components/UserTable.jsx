// components/UserTable.jsx
import { Link } from "react-router-dom";

const UserTable = ({ users, showApprove, onApprove, onDelete, backUserRole, loading }) => {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border border-gray-300 shadow-sm">
        <thead>
          <tr className="bg-blue-100 text-gray-700 text-sm uppercase">
            <th className="py-3 px-4 border">Avatar</th>
            <th className="py-3 px-4 border">Name</th>
            <th className="py-3 px-4 border">Age</th>
            <th className="py-3 px-4 border">Email</th>
            <th className="py-3 px-4 border">Contact</th>
            <th className="py-3 px-4 border">Vehicle</th>
            {!showApprove && <th className="py-3 px-4 border">Logsheet</th>}
            {<th className="py-3 px-4 border">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border">
                <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="py-3 px-4 border">{user.name}</td>
              <td className="py-3 px-4 border">{user.age}</td>
              <td className="py-3 px-4 border">{user.email}</td>
              <td className="py-3 px-4 border">{user.contactNumber}</td>
              <td className="py-3 px-4 border">{user.vehicleToLearn?.join(", ")}</td>
              {!showApprove && (
                <td className="py-3 px-4 border">
                  <Link to={`/logsheet/${user._id}`} className="text-blue-500 hover:underline">View</Link>
                </td>
              )}
              {(
                <td className="py-3 px-4 border text-center">
                  <div className="flex justify-center gap-2">
                    {showApprove && (
                      <button
                        onClick={() => onApprove(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                        disabled={loading}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
