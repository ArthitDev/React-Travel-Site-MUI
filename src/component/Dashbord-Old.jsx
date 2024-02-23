import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashborad = () => {
  const [places, setPlaces] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    descript: "",
    img: "",
    type: "",
    score: "",
  });

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    axios
      .get("http://localhost/apiPlace/")
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      axios
        .put(`http://localhost/apiPlace/${formData.id}`, formData)
        .then((response) => {
          fetchPlaces();
          setFormData({
            id: "",
            name: "",
            descript: "",
            img: "",
            type: "",
            score: "",
          });
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      axios
        .post("http://localhost/apiPlace/", formData)
        .then((response) => {
          fetchPlaces();
          setFormData({
            id: "",
            name: "",
            descript: "",
            img: "",
            type: "",
            score: "",
          });
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
        });
    }
  };

  const handleUpdate = (id) => {
    const updatedPlace = places.find((place) => place.id === id);
    setFormData(updatedPlace);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost/apiPlace/${id}`)
      .then((response) => {
        window.alert("กดละ");
        fetchPlaces();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">ตารางแก้ไขข้อมูล</h2>
      {!showForm && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(true)}
        >
          เพิ่มข้อมูล
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={formData.id}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="descript"
              value={formData.descript}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="text"
              className="form-control"
              name="img"
              value={formData.img}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={formData.type}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Score</label>
            <input
              type="text"
              className="form-control"
              name="score"
              value={formData.score}
              onChange={handleFormChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setShowForm(false);
              setFormData({
                id: "",
                name: "",
                descript: "",
                img: "",
                type: "",
                score: "",
              });
            }}
          >
            Cancel
          </button>
        </form>
      )}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Type</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place) => (
            <tr key={place.id}>
              <td>{place.id}</td>
              <td>{place.name}</td>
              <td>{place.descript}</td>
              <td>
                <img src={place.img} alt={place.name} style={{ maxWidth: "100px" }} />
              </td>
              <td>{place.type}</td>
              <td>{place.score}</td>
              <td>
                <div className="btn-group d-flex">
                  <button
                    className="btn btn-md btn-warning flex-fill"
                    onClick={() => {
                      handleUpdate(place.id);
                      setShowForm(true);
                    }}
                  >
                    แก้ไข
                  </button>
                  <button
                    className="btn btn-md btn-danger ms-1 flex-fill"
                    onClick={() => handleDelete(place.id)}
                  >
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashborad;
