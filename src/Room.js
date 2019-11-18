import Host from "./components/Host/Host";
import Join from "./components/Join/Join";
import React, {Component} from "react";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: true,
      code: this.props.match.params.code,
      name: "",
      start: false,
      players: [],
      numberOfRounds: null
    };
    this.socket = io.connect(
      undefined,
       {
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10
      }
    );
    this.socket.on("start", data => {
      if (data === "get ready to start") {
        this.setState({
          start: true
        });
      }
    });

    this.socket.on("game data", data => {
      if (data.room === this.state.code && this.state.host) {
        this.setState({
          players: [
            ...this.state.players,
            {
              name: data.name,
              code: data.room,
              answer: data.answer,
              roundPoints: data.roundPoints,
              totalPoints: data.totalPoints
            }
          ]
        });
        this.socket.emit("update list", {
          players: this.state.players,
          room: this.state.code
        });
      }
    });
    this.socket.on("update list", data => {
      if (data.room === this.state.code && !this.state.host) {
        this.setState({
          players: data.players
        });
      }
    });
    this.socket.on("leave", data => {
      if (data.room === this.state.code) {
        let updatedArr = [...this.state.players];
        const index = updatedArr.findIndex(el => {
          return el === data.name;
        });

        if (index !== -1) {
          updatedArr.splice(index, 1);
          this.setState({
            players: updatedArr
          });
        }
      }
    });
  }

  componentDidMount = async () => {
    window.addEventListener("beforeunload", this.leaveGame);
    const user = await axios.get("/user");
    this.setState({
      name: user.data.user.name,
      code: user.data.user.code,
      host: user.data.user.host,
      numberOfRounds: user.data.user.numberOfRounds
    });

    this.socket.emit("join room", {
      room: this.state.code,
      name: this.state.name,
      answer: "",
      roundPoints: null,
      totalPoints: null
    });
  };

  componentDidUpdate() {
    if (this.state.start) {
      this.socket.emit("start", {
        room: this.state.code
      });
      this.props.history.push(`/game/${this.state.code}`);
    }
  }

  // componentWillUnmount() {
  //   this.leaveGame();
  // }

  // joinRoom(data) {
  //   const roomsArr = this.state.rooms.slice();
  //   roomsArr.push(data);
  //   this.setState({
  //     rooms: roomsArr
  //   });
  // }

  leaveGame = () => {
    this.socket.emit("leave game", {
      name: this.state.name,
      room: this.state.code
    });
  };

  leaveGameBtn = () => {
    this.socket.emit("leave game", {
      name: this.state.name,
      room: this.state.code
    });
    this.props.history.push("/");
  };

  handleStart = async () => {
    if (this.state.players.length < 3) {
     return Swal.fire("3 players are required to begin. Trust me... fewer would be lame.")
    }
    this.setState({
      start: true
    });
    await axios.put(`/api/games/${this.state.code}`);
  };

  handleChange = value => {
    this.setState({
      hostName: value
    });
  };

  render() {
    const playersArr = this.state.players.map(el => {
      return el.name;
    });
    let component;
    if (this.state.host) {
      component = (
        <Host
          leaveGameFn={this.leaveGameBtn}
          players={playersArr}
          handleStartFn={this.handleStart}
          name={this.state.name}
          code={this.state.code}
        />
      );
    } else {
      component = (
        <Join
          leaveGameFn={this.leaveGameBtn}
          players={playersArr}
          name={this.state.name}
          code={this.state.code}
        />
      );
    }

    return <div className="room">{component}</div>;
  }
}

export default Room;
