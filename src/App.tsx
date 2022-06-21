import React from "react";
import "./App.css";
import {  Client, Movie, Person } from "./Ekkodalets";

function App() 
{
  const [PersonList, setPersonList] = React.useState<Person[] | null>();
  const [MovieList, setMovieList] = React.useState<Movie[] | null>();

  React.useEffect(() => {    
    loadPersons();
    loadMovies();
  }, [setPersonList, setMovieList]);

  const EkkodaleClient = new Client("https://localhost:7200");

  async function loadPersons() 
  {
    const PersonList = await EkkodaleClient.personNeo4JAll();
    setPersonList(PersonList);
  }

  async function loadMovies() 
  {
    const MovieList = await EkkodaleClient.movieNeo4JAll();
    setMovieList(MovieList);
  }

  return (
    <div className="App">
      <header className="App-header">
        {PersonList ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Family</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {PersonList.map(({ personID, name, family, age, fullName }) => (
                <tr key={personID}>
                  <td>{name}</td>
                  <td>{family}</td>
                  <td>{age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading Persons...</p>
        )}
        <div> ---------------------------------------------------------------</div>
      {MovieList ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th style={{paddingLeft:"100px"}}>Year</th>
              </tr>
            </thead>
            <tbody>
              {MovieList.map(({ movieID, title , year }) => (
                <tr key={movieID}>
                  <td>{year}</td>
                  <td style={{paddingLeft:"100px"}}>{title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading Movies...</p>
        )}
        
      </header>
    </div>
  );
}

export default App;