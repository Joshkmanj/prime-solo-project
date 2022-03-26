import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
        <h2>About this project</h2>
      <h3>Technologies Used:</h3>
      <ul>
        <li>React</li>
        <li>Redux</li>
        <li>Sagas</li>
        <li>Node</li>
        <li>Axios</li>
        <li>Express</li>
        <li>Material UI</li>
        <li>Kanye REST API</li>
        <li>PostgresQL</li>
      </ul>
      <h3>Awesome people</h3>
      <ul>
        <li>Parents</li>
        <li>Staci</li>
        <li>Friends</li>
        <li>Liz</li>
        <li>Dane</li>
        <li>Chris</li>
        <li>The rest of Prime Staff and Students</li>
      </ul>
      </div>
    </div>
  );
}

export default AboutPage;
