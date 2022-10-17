import axios from "axios";
import { useEffect, useState } from "react";

export const useAxios = () => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState();

  const customAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("JWT") || ""}`,
    },
  });

  const fetchData = async (params) => {
    try {
      const result = await customAxios.request(params);
      setResponse(result.data);
      setStatus(result.status);
    } catch (error) {
      setError(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { status, response, error, loading, fetchData };
};
