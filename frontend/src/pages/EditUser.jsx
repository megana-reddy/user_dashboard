import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`http://localhost:5000/api/users/${id}`);
            const data = await res.json();

            setFormData({
                name: data.name,
                email: data.email,
                phone: data.phone,
                company: data.company,
                street: data.address.street,
                city: data.address.city,
                zipcode: data.address.zipcode,
                lat: data.address.geo.lat,
                lng: data.address.geo.lng
            });
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            address: {
                street: formData.street,
                city: formData.city,
                zipcode: formData.zipcode,
                geo: {
                    lat: formData.lat,
                    lng: formData.lng
                }
            }
        };

        await fetch(`http://localhost:5000/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        });

        navigate(`/users/${id}`);
    };

    if (!formData) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Edit User
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <h3 className="text-lg font-semibold text-gray-700 mt-6">
                        Address
                    </h3>

                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street"
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        placeholder="Zipcode"
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="lat"
                            value={formData.lat}
                            onChange={handleChange}
                            placeholder="Latitude"
                            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />

                        <input
                            type="text"
                            name="lng"
                            value={formData.lng}
                            onChange={handleChange}
                            placeholder="Longitude"
                            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
                        >
                            Update User
                        </button>

                        <Link
                            to={`/users/${id}`}
                            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </Link>
                    </div>

                </form>

            </div>
        </div>
    );

}

export default EditUser;
