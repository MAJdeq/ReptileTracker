import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useCounter } from "./utils/use_counter";
import { requireLogin } from "./utils/require_login";
import { ReptileRegister } from "./reptileRegister";

export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {count, add, subtract} = useCounter();

  return (
    <header>
      <h2>YOUR REPTILES</h2>
      <ReptileRegister />
    </header>
  )
}