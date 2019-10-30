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
      start: false
    };
    this.socket = io.connect();
    this.socket.on("join room", data => this.joinRoom(data));
  }

  componentDidMount = async () => {
    const user = await axios.get("/user");
    // this.setState({
    //   name: user.data.user.name,
    //   code: user.data.user.code,
    //   host: user.data.user.host
    // });

    if (this.state.start) {
      this.props.history.push(`/game/${this.state.code}`);
    }

    this.socket.emit("join room", {
      room: this.state.code
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.start !== this.state.start) {
      this.props.history.push(`/game/${this.state.code}`);
    }
  }

  // joinRoom(data) {
  //   const roomsArr = this.state.rooms.slice();
  //   roomsArr.push(data);
  //   this.setState({
  //     rooms: roomsArr
  //   });
  // }

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
          handleStartFn={this.handleStart}
          name={this.state.name}
          code={this.state.code}
        />
      );
    } else {
      component = <Join name={this.state.name} code={this.state.code} />;
    }

    return <div className="room">{component}</div>;
  }
}

export default Room;
