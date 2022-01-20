import React from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
    currentOperator: "+",
    isCorrect: undefined,
    operators: ["+"],
  };

  pickNumber = (max) => Math.floor(Math.random() * max);

  newGame = () => {
    const { num1Max, num2Max, operators } = this.state;
    this.setState({
      num1: this.pickNumber(num1Max + 1),
      num2: this.pickNumber(num2Max + 1),
      currentOperator: operators[this.pickNumber(operators.length)],
      answer: "",
    });
  };

  compute = () => {
    const { num1, num2, currentOperator } = this.state;
    if (currentOperator === "+") {
      return num1 + num2;
    }

    if (currentOperator === "-") {
      return num1 - num2;
    }

    if (currentOperator === "×") {
      return num1 * num2;
    }

    if (currentOperator === "÷") {
      return num1 / num2;
    }
  };

  checkAnswer = () => {
    const { answer } = this.state;
    if (this.compute() === parseInt(answer)) {
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

  onToggleChange = (_event, newOperators) => {
    if (newOperators.length) {
      this.setState({ operators: newOperators });
    }
  };

  render() {
    const { num1, num2, num1Max, num2Max, operators, currentOperator } =
      this.state;
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
              value={currentOperator}
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
          <Typography>ערך מקסימילי מספר ראשון</Typography>
          <Slider
            value={num1Max}
            valueLabelDisplay="auto"
            onChange={this.onNum1MaxChange}
          />
          <Typography>ערך מקסימלי מספר שני</Typography>
          <Slider
            value={num2Max}
            valueLabelDisplay="auto"
            onChange={this.onNum2MaxChange}
          />
          <hr />
          <Typography>סוגי פעולות</Typography>
          <ToggleButtonGroup
            value={operators}
            onChange={this.onToggleChange}
            size="large"
          >
            <ToggleButton value="+" sx={{ padding: "15px 20px" }}>
              +
            </ToggleButton>
            <ToggleButton value="-" sx={{ padding: "15px 20px" }}>
              -
            </ToggleButton>
            <ToggleButton value="×" sx={{ padding: "15px 20px" }}>
              ×
            </ToggleButton>
            <ToggleButton value="÷" sx={{ padding: "15px 20px" }}>
              ÷
            </ToggleButton>
          </ToggleButtonGroup>
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
