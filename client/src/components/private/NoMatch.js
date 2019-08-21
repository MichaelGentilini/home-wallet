import React from "react";

export default function NoMatch() {
  return (
    <div className="bg bg-nomatch pt-3">
      <div>
        <div className="container">
          <div className="jumbotron text-center">
            <h3>You've reached a dead end</h3>
            <br />
            <a href="/" className="btn btn-success btn lg">
              Take Me Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
