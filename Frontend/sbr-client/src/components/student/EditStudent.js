import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        average: "",
    });

    const { firstName, lastName, average } = student;

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        const result = await axios.get(
            `http://app.sally.com/api/students/students/${id}`
        );
        setStudent(result.data);
    };

    const handleInputChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const updateStudent = async (e) => {
        e.preventDefault();
        await axios.put(
            `http://app.sally.com/api/students/update/${id}`,
            student
        );
        navigate("/view-students");
    };

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5">Edit Student</h2>
            <form onSubmit={updateStudent}>
                {/* First Name Field */}
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={firstName}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Last Name Field */}
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={lastName}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Average Field */}
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="average">
                        Average
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="number"
                        name="average"
                        id="average"
                        required
                        value={average}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Save and Cancel Buttons */}
                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button type="submit" className="btn btn-outline-success btn-lg">
                            Save
                        </button>
                    </div>

                    <div className="col-sm-2">
                        <Link to="/view-students" className="btn btn-outline-warning btn-lg">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditStudent;
