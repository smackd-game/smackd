import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert2";
import "./_landing.scss"

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      showJoin: false,
      showHost: false,
      name: "",
      code: null,
      isHost: false,
      numberOfRounds: null
    };
  }

  componentDidMount = () => {
    const code = `${Math.floor(Math.random() * 10)}${Math.floor(
      Math.random() * 10
    )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
    this.setState({
      code: code
    });
  };
  switchToHost = () => {
    this.setState({
      showHost: true,
      isHost: true
    });
  };
  switchToJoin = () => {
    this.setState({
      showJoin: true
    });
  };
  backFN = () => {
    this.setState({
      showJoin: false,
      showHost: false,
      isHost: false
    });
  };

  setRound = (val) => {
    this.setState({
      numberOfRounds: val
    })
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  joinGame = async () => {
    if(this.state.name === ''){
        swal.fire('Please Enter a Name AND a Code First')
    } else {
      const game = await axios.get(`/api/games/${this.state.code}`);
    if (game.data !== 'game not found' && game.data.joinable) {
      axios
        .post("/user", {
          name: this.state.name,
          host: this.state.isHost,
          code: this.state.code
        })
        .then(() => {
          this.props.history.push(`/lobby/${this.state.code}`);
        });
    } else {
      swal.fire("That game doesn't exist dummy");
    }
    }
    
  };

  hostGame = () => {
    if(!this.state.name || !this.state.numberOfRounds){
      swal.fire('Please Enter a Name and Pick How Many Rounds')
    } else {
      axios.post(`/api/games/${this.state.code}`).then(() => {
        axios
          .post("/user", {
            name: this.state.name,
            host: this.state.isHost,
            code: this.state.code,
            numberOfRounds: this.state.numberOfRounds
          })
          .then(() => {
           
              this.props.history.push(`/lobby/${this.state.code}`);

          });
      });
    }
    
  };
//need content
// and position absolute
//transform rotat
//parent relative
  render() {
    if (this.state.showHost === false && this.state.showJoin === false) {
      return (
        <div className="landing-container">

          <div className = "polygon-top">
              <div className = "rectangle-top" onClick={() => this.switchToJoin()}>
                <h1>Join</h1>
              </div>
              <div className = "triangle-top" ></div>
          </div>
          <div className = "polygon-middle">
            <div className = "white-banner"></div>
            <div className = "triangle-middle-top"></div> 
            <div className = "rectangle-middle">
              <h1>
                SMAK'd
              </h1>
            </div>
            <div className = "triangle-middle-bottom"></div>
          </div>
          <div className = "polygon-bottom" >
            <div className = "triangle-bottom" >
            </div>
            <div className = "rectangle-bottom" onClick={() => this.switchToHost()}>
              <h1>Host</h1>
            </div>
          </div>
          
          {/* <div className="smack-logo">
          <h1>Smackd</h1>
          </div> */}
          {/* <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laudantium, laboriosam aliquid maxime corrupti fuga eaque deserunt
            nemo ducimus, ipsam sed enim! Provident necessitatibus eos
            distinctio error officiis explicabo aliquid pariatur.
          </p> */}
          {/* <div className="landingbuttons">
            <button className='landing-button' onClick={() => this.switchToHost()} >
              Host
            </button>
            <button className='landing-button' onClick={() => this.switchToJoin()}>
              Join
            </button>
          </div> */}
          
        </div>
      );
    } else if (this.state.showHost === true) {
      return (
        <div className="landing-container">
          <div className= "host-top">
            <div className = "back-arrow">
              <div className = "left-triangle" onClick={() => this.backFN()}></div>
              <div className = "arrow-rectangle" onClick={() => this.backFN()}></div>
            </div>
          </div>
          <div className= "host-middle">
              <div className = "host-banner">
              <div className = "host-background">
                <div className = "text">
                  <h2>HOST</h2>
                </div>
              </div>
              </div>
            <div className = "rounds">
              <button onClick={() => this.setRound(3)} className="landing-button three">Three Rounds</button>
              <button onClick={() => this.setRound(5)} className="landing-button five">Five Rounds</button>
              <button onClick={() => this.setRound(7)} className="landing-button seven">Seven Rounds</button>
            </div>  
            
            <input
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e, "name")}
            placeholder="Enter Username"
            type="text"
          />
          </div>
          <div className= "host-bottom">
            <div className = "forward-arrow">
              <div className = "arrow-rectangle" onClick={() => this.hostGame()}></div>
              <div className = "right-triangle"></div>

            </div>
            
          </div>
          <div className= "host-bottom">
            <div className = "forward-arrow">
              <div className = "arrow-rectangle" onClick={() => this.joinGame()}></div>
              <div className = "right-triangle"></div>
  
            </div>
            
          </div>
        </div>
        </div>
      );
    }
  }
}

export default Landing;
