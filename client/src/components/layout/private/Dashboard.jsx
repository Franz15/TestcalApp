import React, { useState, useEffect, useRef } from "react";
import { Table9c } from "../../accesories/Table9c";
import { Global } from "../../../helpers/Global";
import Ratings from "../../accesories/Ratings";
import { RadarChart } from "../../accesories/RadarChart";
import { LinearChart } from "../../accesories/LinearChart";
import { useAuth } from "../../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import "./dashboard.css";
import "./animations.css";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [results, setResults] = useState([]);
  const [avgResult, setAvgResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const dataFetchedRef = useRef(false);

  // Fetch results data
  const getResults = async () => {
    try {
      const request = await fetch(Global.url + "results/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await request.json();
      if (data.status === "success" && data.results) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    }
  };

  // Fetch average result data
  const getAvgResult = async () => {
    try {
      const request = await fetch(Global.url + "results/grade/" + auth._id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await request.json();
      if (data.status === "success") {
        if (data.result != null) {
          setAvgResult(data.result[0]);
        } else {
          setAvgResult(0);
        }
      }
    } catch (error) {
      console.error("Error fetching average result:", error);
      setAvgResult(0);
    }
  };

  // Handle results update from child components
  function handleResults(results) {
    setResults(results);
  }

  // Load data only once
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getResults(), getAvgResult()]);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
        // Delay showing content to ensure smooth animation
        setTimeout(() => {
          setContentVisible(true);
        }, 100);
      }
    };
    
    fetchData();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="dashboard-loading">
        <CircularProgress size={40} thickness={4} />
      </div>
    );
  }

  // Render dashboard content with animations
  return (
    <section className="content">
      <div className={contentVisible ? "dashboard-content visible" : "dashboard-content"}>
        <article className="ratings animate-item" style={{ animationDelay: '0s' }}>
          <Ratings results={results} />
        </article>
        
        <div className="noflex-wrap">
          <article className="linear-chart animate-item" style={{ animationDelay: '0.1s' }}>
            <LinearChart results={results} />
          </article>
          
          <article className="radar-chart animate-item" style={{ animationDelay: '0.2s' }}>
            <RadarChart results={results} />
          </article>
          
          <article className="radar-chart animate-item" style={{ animationDelay: '0.3s' }}>
            <RadarChart results={results} />
          </article>
        </div>
        
        <article className="table animate-item" style={{ animationDelay: '0.4s' }}>
          <Table9c results={results} handleResults={handleResults} />
        </article>
      </div>
    </section>
  );
}
