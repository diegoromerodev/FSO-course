const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}


const App = () => {
  const name = "Peter"
  const age = 10
  return (
    <div>
        <h1>Greetings</h1>
        <Hello name="Diego" age={age + 14} />
        <Hello name={name} age={age} />
    </div>
  );
}

export default App;
