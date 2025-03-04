import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { setAvatarRoute } from "../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/index";
const SetAvatar = () => {
  const api = "https://api.multiavatar.com/4567897";

  const navigate = useNavigate();
  // navigate("/");
  const [avatars, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please Set One Image", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
        // isAvatarImageSet: user.isAvatarImageSet,
      });
      console.log(data, "here is the data");
      console.log(user.isAvatarImageSet, "AvatarImage");
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error settings avatar , Please try again ", toastOptions);
      }
    }
  };
  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer.from(response.data, "binary"); // Use Buffer.from
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
      setAvatar(data);
      setIsLoading(false);
    };

    fetchAvatars();
  }, [api]); // Add `api` as a dependency if it's a variable

  // if (isLoading) {
  //   return <div>Loading...</div>;

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar As your Profile photo</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar  ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
