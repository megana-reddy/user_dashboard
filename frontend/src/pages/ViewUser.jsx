import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

function ViewUser() {
  const { id } = useParams() // get :id from URL
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    })
    navigate("/");
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          User Details
        </h2>

        <div className="space-y-4">
          <p>
            <span className="font-medium text-gray-700">Name:</span>{" "}
            {user.name}
          </p>

          <p>
            <span className="font-medium text-gray-700">Email:</span>{" "}
            {user.email}
          </p>

          <p>
            <span className="font-medium text-gray-700">Phone:</span>{" "}
            {user.phone}
          </p>

          <p>
            <span className="font-medium text-gray-700">Company:</span>{" "}
            {user.company}
          </p>

          <div>
            <p className="font-medium text-gray-700">Address:</p>
            <p className="text-gray-600">
              {user.address.street}, {user.address.city} - {user.address.zipcode}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            to={`/edit/${user._id}`}
            className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Edit User
          </Link>

          <Link
            to="/"
            className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Back
          </Link>
        </div>

      </div>
    </div>
  );

}

export default ViewUser
