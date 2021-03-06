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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const correctText = "๐ !ืื ืืืืื";
const wrongText = "๐ค .ืื ื ืืื. ืืืื ื ื ืกื ืฉืื";

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
    isCorrect: false,
    operators: ["+"],
    isOpen: false,
  };

  pickNumber = (max) => Math.floor(Math.random() * max);

  newGame = () => {
    const { num1Max, num2Max, operators } = this.state;
    const currentOperator = operators[this.pickNumber(operators.length)];
    const num1 = this.pickNumber(num1Max + 1);
    let num2;

    if (currentOperator === "-") {
      num2 = this.pickNumber(num1 + 1);
    } else if (currentOperator === "รท" && num1) {
      const possibleNumbers = [];
      for (let i = 1; i < num1 + 1; i++) {
        if (!(num1 % i)) {
          possibleNumbers.push(i);
        }
      }
      num2 = possibleNumbers[this.pickNumber(possibleNumbers.length)];
    } else {
      num2 = this.pickNumber(num2Max + 1);
    }

    this.setState({
      num1,
      num2,
      currentOperator,
      answer: "",
      isOpen: false,
    });
  };

  showAnswer = () => {
    this.setState({
      answer: this.compute(),
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

    if (currentOperator === "ร") {
      return num1 * num2;
    }

    if (currentOperator === "รท") {
      return num1 / num2;
    }
  };

  checkAnswer = () => {
    this.setState({
      isOpen: true,
      isCorrect: this.compute() === parseInt(this.state.answer),
    });
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

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const {
      num1,
      num2,
      num1Max,
      num2Max,
      operators,
      currentOperator,
      isOpen,
      isCorrect,
    } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ marginTop: "2vh" }}>
          <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogTitle>{isCorrect ? correctText : wrongText}</DialogTitle>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>ืกืืืจ</Button>
              <Button onClick={this.newGame}>ืชืจืืื ืืืฉ</Button>
            </DialogActions>
          </Dialog>
          <div className="excerciseContainer">
            <TextField
              label="ืืกืคืจ ืจืืฉืื"
              InputProps={{
                readOnly: true,
              }}
              value={num1}
              sx={{ marginRight: "5px" }}
            />
            <div>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                value={currentOperator}
                sx={{ width: "40px", marginRight: "5px" }}
              />
            </div>
            <TextField
              label="ืืกืคืจ ืฉื ื"
              InputProps={{
                readOnly: true,
              }}
              value={num2}
              sx={{ marginRight: "5px" }}
            />
            <div>=</div>
            <TextField
              label="ืชืฉืืื"
              onChange={this.onAnswerChange}
              variant="outlined"
              value={this.state.answer}
              type="number"
              inputProps={{ inputMode: "numeric" }}
              sx={{ marginLeft: "5px" }}
            />
          </div>
          <hr />
          <Typography>ืขืจื ืืงืกืืืืื ืืกืคืจ ืจืืฉืื</Typography>
          <Slider
            value={num1Max}
            valueLabelDisplay="auto"
            onChange={this.onNum1MaxChange}
          />
          <Typography>ืขืจื ืืงืกืืืื ืืกืคืจ ืฉื ื</Typography>
          <Slider
            value={num2Max}
            valueLabelDisplay="auto"
            onChange={this.onNum2MaxChange}
          />
          <hr />
          <Typography>ืกืืื ืคืขืืืืช</Typography>
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
            <ToggleButton value="ร" sx={{ padding: "15px 20px" }}>
              ร
            </ToggleButton>
            <ToggleButton value="รท" sx={{ padding: "15px 20px" }}>
              รท
            </ToggleButton>
          </ToggleButtonGroup>
          <hr />
          <ButtonGroup variant="contained">
            <Button onClick={this.newGame}>ืืืฉ</Button>
            <Button onClick={this.showAnswer}>ืืฉืืฃ ืชืฉืืื</Button>
            <Button onClick={this.checkAnswer}>ืืืืง</Button>
          </ButtonGroup>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
