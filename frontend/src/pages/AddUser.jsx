import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AddUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        street: "",
        city: "",
        zipcode: "",
        lat: "",
        lng: ""
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");

    // handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // validation logic
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be exactly 10 digits";
        }

        if (!formData.company.trim()) {
            newErrors.company = "Company is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!formData.lat.trim() || !formData.lng.trim()) {
            newErrors.geo = "Latitude and Longitude are required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");

        if (!validate()) return;

        const newUser = {
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

        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            navigate("/");
        } catch (err) {
            setApiError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Add New User
                </h2>

                {apiError && (
                    <p className="text-red-500 mb-4">{apiError}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    {/* Phone */}
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg" />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                    {/* Company */}
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg" />
                    {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}

                    <h3 className="text-lg font-semibold text-gray-700 mt-6">
                        Address
                    </h3>

                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg" />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg" />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

                    <input
                        type="text"
                        name="zipcode"
                        placeholder="Zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded-lg"/>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="lat"
                            placeholder="Latitude"
                            value={formData.lat}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded-lg" />
                        <input
                            type="text"
                            name="lng"
                            placeholder="Longitude"
                            value={formData.lng}
                            onChange={handleChange} className="border px-4 py-2 rounded-lg" />
                    </div>
                    {errors.geo && <p className="text-red-500 text-sm">{errors.geo}</p>}

                    <div className="flex gap-4 pt-6">
                        <button type="submit" className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600">
                            Save User
                        </button>

                        <Link to="/" className="border px-6 py-2 rounded-lg">
                            Cancel
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddUser;
