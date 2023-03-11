import NoteContext from "./noteContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const [user, setUser] = useState(null);
  // const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const baseURL = import.meta.env.REACT_APP_BASE_URL;

  //get the logged in user
  useEffect(() => {
    axios
      .get(`${baseURL}/server/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setUser(response.data);
      });
  }, [token]);

  const refreshToken = (token) => {
    setToken(token);
  };
  // const checkSessionExpiration = (user) => {
  //   if (user) {
  //     const exp = user.exp;
  //     console.log(exp);
  //     const now = Date.now() / 1000;
  //     if (now > exp) {
  //       console.log("session expired");
  //       setIsSessionExpired(true);
  //       localStorage.removeItem("token");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (user) checkSessionExpiration(user);
  // }, [user]);

  //get all projects
  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`${baseURL}/server/projects`, {
          params: {
            email: user.email,
          },
        });
        // console.log(res.data.projects);
        setProjects(res.data.projects);
      } catch {
        return null;
      }
    };
    getProjects();
  }, [user, token]);

  const state = {
    user: user,
    projects: projects,
    refreshToken: refreshToken,
  };

  return (
    <div>
      <NoteContext.Provider value={state}>
        {props.children}
      </NoteContext.Provider>
      {/* {isSessionExpired ? (
        <div className="expired-wrapper bg-brightWhite h-56 z-20 absolute top-0 left-0 right-0 bottom-0 w-full msm:w-1/2 m-auto shadow-lg p-2 rounded flex items-center flex-col justify-center gap-2">
          <div className="text-lg msm:text-xl font-medium text-black2">
            Your session has expired
          </div>
          <p className="text-lightGray ">Please log in again to continue.</p>
          <button
            className="bg-brightOrange text-brightWhite rounded-full px-10 py-1.5 mt-2"
            onClick={getLogInPage}
          >
            Log In
          </button>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default NoteState;
