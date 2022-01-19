import React from "react";
import "./number-box.css";
import Paper from "@mui/material/Paper";

export class NumberBox extends React.PureComponent {
  render() {
    return (
      <Paper
        elevation={3}
        sx={{
          width: "10vh",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>{this.props.num}</p>
      </Paper>
    );
  }
}
