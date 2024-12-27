import { useState } from "react";
import {
	Link,
	useNavigate,
} from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
	let navigate = useNavigate();
	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		average: "", // Champ pour la moyenne
	});

	const { firstName, lastName, average } = student;

	const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};

	const saveStudent = async (e) => {
		e.preventDefault();
		try {
			console.log("Student object before sending:", student); // Affiche l'objet avant l'envoi
			const response = await axios.post("http://app.sally.com/api/students", student);
			navigate("/view-students");
		} catch (error) {
			console.error("Error saving student:", error.response ? error.response.data : error);
		}
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Add Student</h2>
			<form onSubmit={saveStudent}>
				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="firstName">First Name</label>
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

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="lastName">Last Name</label>
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

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="average">Average</label>
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

				<div className="row mb-5">
					<div className="col-sm-2">
						<button type="submit" className="btn btn-outline-success btn-lg">Save</button>
					</div>

					<div className="col-sm-2">
						<Link to={"/view-students"} className="btn btn-outline-warning btn-lg">Cancel</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddStudent;
