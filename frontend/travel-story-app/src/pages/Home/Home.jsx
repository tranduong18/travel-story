import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const navigate = useNavigate();

  const [ userInfo, setUserInfo ] = useState(null);
  const [ allStories, setallStories ] = useState(null);

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  // Get all travel stories
  const getAllTravelStories = async () => {
    
  }

  useEffect(() => {
    getUserInfo();
  
    return () => {
      
    }
  }, [])
  

  return (
    <>
      <Navbar userInfo={userInfo}/>

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1"></div>

          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  )
}

export default Home