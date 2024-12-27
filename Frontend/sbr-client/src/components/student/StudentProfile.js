import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        Average: "",
        creatAt: "",
    });
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ courseName: "", noteValue: "" });

    // Utilisation de useCallback pour éviter la redéfinition de la fonction
    const loadStudent = useCallback(async () => {
        try {
            const result = await axios.get(`http://backend.example.com/api/students/students/${id}`);
            setStudent(result.data);
        } catch (error) {
            console.error("There was an error loading the student data:", error);
        }
    }, [id]);  // Dépend de l'id

    const loadNotes = useCallback(async () => {
        try {
            const result = await axios.get(`http://backend.example.com/api/students/students/${id}/notes`);

            setNotes(result.data);  // Mettez à jour l'état avec les notes récupérées
        } catch (error) {
            console.error("Erreur de récupération des notes :", error);
        }
    }, [id]);  // Dépend de l'id

    // Chargement des informations de l'étudiant et des notes lors du montage
    useEffect(() => {
        loadStudent();
        loadNotes();
    }, [loadStudent, loadNotes]);  // Ajout des fonctions dans le tableau des dépendances

    // Chargement des notes à chaque changement d'id
    useEffect(() => {
        loadNotes();  // Charger les notes à l'initialisation du profil
    }, [id, loadNotes]);  // Ajout de loadNotes dans les dépendances

    useEffect(() => {
        console.log("Notes chargées :", notes);  // Vérifier si les notes sont bien récupérées
    }, [notes]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://http://app.sally.com/api/api/notes/add", {
            ...newNote,
            student: { id }, // Relier la note à l'étudiant
        });
        setNewNote({ courseName: "", noteValue: "" });
        loadNotes(); // Recharger les notes après l'ajout
    };

    return (
        <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-3">
                        {/* Informations de l'étudiant */}
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <h5 className="my-3">{`${student.firstName} ${student.lastName}`}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        {/* Tableau des notes de l'étudiant */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4>Notes de l'étudiant</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Nom du Cours</th>
                                            <th>Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notes.length > 0 ? (
                                            notes.map((note) => (
                                                <tr key={note.id}>
                                                    <td>{note.courseName}</td>
                                                    <td className={note.noteValue > 10 ? "highlight-green" : "highlight-red"}>
                                                        {note.noteValue}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2">Aucune note disponible</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Formulaire pour ajouter une nouvelle note */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4>Ajouter une note</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="courseName" className="form-label">Nom du cours</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="courseName"
                                            name="courseName"
                                            value={newNote.courseName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="noteValue" className="form-label">Valeur de la note</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="noteValue"
                                            name="noteValue"
                                            value={newNote.noteValue}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentProfile;
