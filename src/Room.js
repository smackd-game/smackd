import Host from "./components/Host/Host";
import Join from "./components/Join/Join";
import React, {Component} from "react";
import io from "socket.io-client";
import axios from "axios";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: true,
      code: this.props.match.params.code,
      name: "",
      start: false,
      players: []
    };
    this.socket = io.connect();
    // this.socket.on("join room", data => this.joinRoom(data));
    this.socket.on("game data", data => {
      if (data.room === this.props.match.params.code && this.state.host) {
        this.setState({
          players: [...this.state.players, data.name]
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
      host: user.data.user.host
    });

    if (this.state.start) {
      this.props.history.push(`/game/${this.state.code}`);
    }

    this.socket.emit("join room", {
      room: this.state.code,
      name: this.state.name
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.start !== this.state.start) {
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

  handleStart = () => {
    this.setState(
      {
        start: true
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleChange = value => {
    this.setState({
      hostName: value
    });
  };

  render() {
    let component;
    if (this.state.host) {
      component = (
        <Host
          leaveGameFn={this.leaveGameBtn}
          players={this.state.players}
          handleStartFn={this.handleStart}
          name={this.state.name}
          code={this.state.code}
        />
      );
    } else {
      component = (
        <Join
          leaveGameFn={this.leaveGameBtn}
          players={this.state.players}
          name={this.state.name}
          code={this.state.code}
        />
      );
    }

    return <div className="room">{component}</div>;
  }
}

export default Room;
