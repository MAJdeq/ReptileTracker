import { useState } from "react";
import { useApi } from "./utils/use_api";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useNavigate } from "react-router-dom";

export const ReptileRegister = () => {
  const [species, setSpecies] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function createReptile(e) {
    e.preventDefault();
    const res = await api.post("/reptiles", {
      species,
      name,
      sex,
    });
    // Assuming the response contains a token
    dispatch(setAuthToken(res.token));

    navigate("/");
  }

  return (
    <div>
      <h2>Register Reptile</h2>
      <form className="reptile-register-form" onSubmit={createReptile}>
        <input
          placeholder="Species"
          type="text"
          value={species}
          required
          onChange={(e) => setSpecies(e.target.value)}
        />
        <input
          placeholder="Name"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Sex"
          type="text"
          value={sex}
          required
          onChange={(e) => setSex(e.target.value)}
        />

        <button>Register Reptile</button>
      </form>
    </div>
  );
};
