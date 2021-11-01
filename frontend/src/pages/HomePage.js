import { useEffect, useState } from "react";
import axios from "axios";
import Restaraunt from "../components/Restaraunt";

const HomePage = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [restaraunts, setRestaraunts] = useState([]);
  const [getList, setGetList] = useState(false);

  useEffect(() => {
    axios
      .get("/api/restaraunts")
      .then((res) => {
        setRestaraunts(res.data);
        // console.log(restaraunts);
      })
      .catch((err) => console.log(err));
  }, [getList]);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imageName", fileName);
    formData.append("code", e.target.code.value);
    formData.append("name", e.target.name.value);
    formData.append("address", e.target.address.value);
    try {
      const { data } = await axios.post("/api/addRestaraunt", formData);
      console.log(data);
      setGetList(!getList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (idRestaraunt) => {
    console.log(idRestaraunt);
    await axios
      .post(`/api/deleteRestaraunt/${idRestaraunt}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
    setGetList(!getList);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="col-25">Code</label>
          <input
            type="text"
            className="text-box col-75"
            name="code"
            placeholder="Enter restaurant code"
          ></input>
        </div>
        <div className="input-group">
          <label className="col-25">Name</label>
          <input
            type="text"
            className="text-box col-75"
            name="name"
            placeholder="name"
          />
        </div>
        <div className="input-group">
          <label className="col-25">Address</label>
          <input
            type="text"
            className="text-box col-75"
            name="address"
            placeholder="address"
          />
          <label className="col-25">Image</label>
          <input
            className="col-75 file-input"
            type="file"
            name="image"
            accept="image/*"
            onChange={saveFile}
          />
        </div>

        <div className="button-div">
          <button className="add-button" type="submit">
            Add Restaraunt
          </button>
        </div>
      </form>
      <hr></hr>
      <div>
        {restaraunts.map((restaraunt) => {
          return (
            <Restaraunt
              key={restaraunt.idRestaraunt}
              restarauntInfo={restaraunt}
              handleDelete={handleDelete}
            ></Restaraunt>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
