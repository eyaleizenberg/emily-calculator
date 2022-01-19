import React from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
// *9506 moked corona

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

class App extends React.Component {
  state = {
    num1: 2,
    num1Max: 10,
    num2: 3,
    num2Max: 10,
    answer: "",
    isCorrect: undefined,
  };

  pickNumber = (max) => Math.floor(Math.random() * (max + 1));

  newGame = () => {
    this.setState({
      num1: this.pickNumber(this.state.num1Max),
      num2: this.pickNumber(this.state.num2Max),
      answer: "",
    });
  };

  checkAnswer = () => {
    const { num1, num2, answer } = this.state;
    if (num1 + num2 == answer) {
      alert("נכון!");
    } else {
      alert("לא נכון");
    }
  };

  onAnswerChange = (event) => {
    this.setState({
      answer: event.target.value,
    });
  };

  onNum1MaxChange = (event) => {
    this.setState({
      num1Max: event.target.value,
    });
  };

  onNum2MaxChange = (event) => {
    this.setState({
      num2Max: event.target.value,
    });
  };

  render() {
    const { num1, num2, num1Max, num2Max } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth={"99vh"} sx={{ marginTop: "2vh" }}>
          <div className="excerciseContainer">
            <TextField
              label="מספר ראשון"
              InputProps={{
                readOnly: true,
              }}
              value={num1}
              sx={{ width: "10vh" }}
            />
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={"+"}
              sx={{ width: "5vh" }}
            />
            <TextField
              label="מספר שני"
              InputProps={{
                readOnly: true,
              }}
              value={num2}
              sx={{ width: "10vh" }}
            />
            <div>=</div>
            <TextField
              label="תשובה"
              onChange={this.onAnswerChange}
              variant="outlined"
              value={this.state.answer}
              sx={{ width: "10vh" }}
            />
          </div>
          <hr />
          <Typography id="input-slider" gutterBottom>
            ערך מקסימילי מספר ראשון
          </Typography>
          <Slider
            value={num1Max}
            valueLabelDisplay="auto"
            onChange={this.onNum1MaxChange}
          />
          <Typography id="input-slider" gutterBottom>
            ערך מקסימלי מספר שני
          </Typography>
          <Slider
            value={num2Max}
            valueLabelDisplay="auto"
            onChange={this.onNum2MaxChange}
          />
          <hr />
          <ButtonGroup variant="contained">
            <Button onClick={this.newGame}>חדש</Button>
            <Button onClick={this.checkAnswer}>בדוק</Button>
          </ButtonGroup>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
