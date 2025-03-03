import React from "react";
import "./NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="error-code">404</h1>
            <h2 className="error-text">Error</h2>
            <p className="not-found-text">Page not found</p>
            <span className="sad-face">(◞‸ ◟)💧</span>
        </div>
    );
}

export default NotFoundPage;
