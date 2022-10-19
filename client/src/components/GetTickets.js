import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const GetTickets = (props) => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const baseURL = "http://localhost:5000/server";
  const email = props.user.email;

  useEffect(() => {
    axios
      .get(`${baseURL}/projects`, {
        params: {
          email: email,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setProjects(response.data.projects);
      });
  }, []);

  useEffect(() => {
    const ids = [];
    for (let i = 0; i < projects.length; i++) {
      ids.push(projects[i]._id);
    }
    console.log(ids);
    axios
      .get(`${baseURL}/bugs`, {
        params: {
          a: ids,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  if (!projects) return <div>Loading..</div>;
  if (!email) return <div>Loading..</div>;

  return (
    <div>
      {projects.map((project) => {
        return (
          <div key={project._id}>
            <h1>{project.title}</h1>
          </div>
        );
      })}
    </div>
  );
};
export default GetTickets;
