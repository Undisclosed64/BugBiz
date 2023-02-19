import React, { useEffect } from "react";
import { useContext, useState } from "react";
import noteContext from "../../context/noteContext";
import axios from "axios";
import GetActivites from "../../components/GetActivities";
import DisplayStatus from "../../components/DisplayStatus";

const Feed = ({ navbar }) => {
  const context = useContext(noteContext);
  const projects = context.projects;
  const [projectId, setProjectId] = useState(null);
  const [project, setProject] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [streamActive, setStreamActive] = useState(true);
  const baseURL = "http://localhost:5000";
  const [reverseArr, setReverseArr] = useState([]);

  //get the selected project
  useEffect(() => {
    axios
      .get(`${baseURL}/server/projects/${projectId}`)
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [projectId]);

  //get the activity stream of the first project
  useEffect(() => {
    // console.log(projects[0].status);
    const firstProjectInfo = async () => {
      await projects;
      console.log(projects[0]._id);
      const projectId = projects[0]._id;
      axios
        .get(`${baseURL}/server/projects/${projectId}`)
        .then((res) => {
          setProject(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    firstProjectInfo();
  }, [projects]);

  //reverse the project activities array
  useEffect(() => {
    if (project) {
      let arr = [];
      for (let i = 0; i < project.trackActivities.length; i++) {
        let element =
          project.trackActivities[project.trackActivities.length - (i + 1)];
        arr.push(element);
      }
      setReverseArr(arr);
    }
  }, [project]);

  const handleChange = (e) => {
    setProjectId(e.target.value);
  };

  const displayStatus = () => {
    setShowStatus(true);
    setStreamActive(false);
    const statusBtn = document.querySelector(".status");
    statusBtn.classList.add("addUnderline");
    const activityStreamBtn = document.querySelector(".activityStream");
    activityStreamBtn.classList.remove("addUnderline");
  };
  const displayActivity = () => {
    setShowStatus(false);
    setStreamActive(true);
    const activityStreamBtn = document.querySelector(".activityStream");
    activityStreamBtn.classList.add("addUnderline");
    const statusBtn = document.querySelector(".status");
    statusBtn.classList.remove("addUnderline");
  };
  const activityStreamBtn = document.querySelector(".activityStream");

  if (activityStreamBtn && !showStatus) {
    activityStreamBtn.classList.add("addUnderline");
  }

  return (
    <div>
      {/* <section
        id="feed"
        className="toggler py-20 px-4 md:px-20 flex justify-center flex-col fixed top-0 left-0 right-0"
      > */}
      <section
        id="feed"
        className="toggler py-20 flex justify-center flex-col fixed top-0 left-0 right-0"
      >
        <div className="projects-dropdown w-full bg-brightWhite drop-shadow py-2 flex items-baseline gap-4 px-4 z-20">
          <div className="mb-3 text-lightGray pl-4">Select Project</div>
          <select
            className=" w-full msm:w-1/2 border-none rounded drop-shadow-sm text-brightOrange capitalize"
            onChange={handleChange}
          >
            {projects.map((project) => {
              return (
                <option key={project._id} value={project._id} className="">
                  {project.title}
                </option>
              );
            })}
          </select>
          ;
        </div>
        <div className="scrollable-content overflow-auto h-screen px-4 md:px-20">
          <input
            type="text"
            className="py-3 px-2 bg-brightWhite rounded-md drop-shadow w-full my-8 border text-veryLightGray tracking-tight"
            placeholder="Share a quick thought and start a discussion"
          />
          <div className="status-stream-wrapper flex gap-12 border-b-[1.5px]">
            <div
              className="activityStream pb-2 hover:cursor-pointer"
              onClick={displayActivity}
            >
              Activity Stream
            </div>
            <div
              className="status hover:cursor-pointer"
              onClick={displayStatus}
            >
              Status
            </div>
          </div>
          {project && streamActive ? (
            <GetActivites activities={reverseArr} />
          ) : (
            ""
          )}
          {showStatus ? <DisplayStatus /> : ""}
        </div>
      </section>
    </div>
  );
};
export default Feed;