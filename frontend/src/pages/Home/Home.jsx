import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import "./home.css";

const STATUS_COLORS = {
    pending: "#f59e0b",
    resolved: "#10b981",
};

const PRIORITY_LABEL = (score) => {
    if (score === null || score === undefined) return { label: "—", cls: "" };
    if (score >= 8) return { label: "High", cls: "priority-high" };
    if (score >= 4) return { label: "Medium", cls: "priority-medium" };
    return { label: "Low", cls: "priority-low" };
};

function IssueCard({ issue }) {
    const priority = PRIORITY_LABEL(issue.priority_score);
    const date = issue.time ? new Date(issue.time).toLocaleDateString() : "—";

    return (
        <div className="issue-card">
            <div className="issue-card-header">
                <span className="issue-title">{issue.issue_title || "Untitled Issue"}</span>
                <span
                    className="issue-status-badge"
                    style={{ background: STATUS_COLORS[issue.status] || "#6b7280" }}
                >
                    {issue.status || "unknown"}
                </span>
            </div>
            <div className="issue-card-meta">
                {issue.department && (
                    <span className="meta-chip">{issue.department}</span>
                )}
                {issue.location && (
                    <span className="meta-chip">📍 {issue.location}</span>
                )}
                <span className="meta-chip">🗓 {date}</span>
                {issue.visibility && (
                    <span className="meta-chip">{issue.visibility === "private" ? "🔒" : "🌐"} {issue.visibility}</span>
                )}
                {priority.label !== "—" && (
                    <span className={`meta-chip priority-chip ${priority.cls}`}>
                        ⚡ {priority.label} Priority
                    </span>
                )}
            </div>
        </div>
    );
}

function Home() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    setError("Not authenticated.");
                    setLoading(false);
                    return;
                }

                const token = await currentUser.getIdToken();

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"}/issues`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: "include", // sends session_id cookie
                    }
                );

                if (!response.ok) {
                    const err = await response.json().catch(() => ({}));
                    throw new Error(err.detail || `Error ${response.status}`);
                }

                const data = await response.json();
                setIssues(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    return (
        <div className="home-page">
            <div className="home-header">
                <h2>My Issues</h2>
                <span className="issue-count">{issues.length} issue{issues.length !== 1 ? "s" : ""}</span>
            </div>

            {loading && (
                <div className="state-message">
                    <div className="spinner" />
                    <p>Loading issues…</p>
                </div>
            )}

            {error && !loading && (
                <div className="state-message error">
                    <p>⚠️ {error}</p>
                </div>
            )}

            {!loading && !error && issues.length === 0 && (
                <div className="state-message">
                    <p>No issues found. You're all clear! ✅</p>
                </div>
            )}

            {!loading && !error && issues.length > 0 && (
                <div className="issue-list">
                    {issues.map((issue) => (
                        <IssueCard key={issue.issue_id} issue={issue} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;