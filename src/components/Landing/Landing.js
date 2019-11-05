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
          {/* <img className="landing-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAADJCAMAAADSHrQyAAABI1BMVEX///8AOVcPWYEeeqs7uv8ANVQAMlIAMFEANFMsmtUAKk0ALk8AN1QALE7MzMwAOVbw8/UAJks0W3Pl6exNb4QAVH7Z4eWxv8imsbr4+vshTmgAIUc8ZXzR0M/t8vQNVXsAHkZ/j5yitsAAQV8Ac6fh4eG/y9Li6OzS2+AAP10bc6Li4uJyi5sAL0s3sfO9ydEJSm0ATHkdRF8VZ5KYp7ImjcRZcoQhgbUyqOg9vv9ugJBhgZMwbI9jiKKEp7yFmaZhnsHS5O60t7owUGhRaHxHfJuctcZUh6SVtMVDc5O1y9cARnUZZIpWgZ2Mpbhrl7AABDuGuNJ3qcitz+FGkbrC2OWPmqOhwtcAaqJdxf+Y2//O7/+M0/+64//m9/+W2f8AFkNbeH8OAAAYVElEQVR4nO1dDXuaSNeWpDMQBEU0IkQxkQTB0GgNIa12SxPT7sfjtu/2I/vud///r3jnzAyIxnSfbroN9uXudbV+IOXmnDnnnpkzQ6lUoECBAgUKFChQoECBAgUKFChQoECBAgUKFChQoECBAl8VNLvfr9vmfV/Gl4XmhkGjPUvQbgQ9V7vvi/r3UfdaU2uvJotYQgkkLMq1PWvaatbv+/L+PdhG3BBqWBHWAYk1vxEP7fu+yH8FzfjKUTFaS5zTl8rOVdy87wv93NCG7T1R+hjxhL641/6qGr9ttFWcYVhVBN/3HWc0chzH9wVBqWa+xWrD+Gpc34gEnOVNOHcJthjgJbkJWf4YRcZ9X/RnQb+BMjb3R5Tz7u7WKrojP2N7pdG/7wu/M+zQEVNGzigx9jfPnt4gz+lz84tCuOGO7zVEHuCqQkp8a/eFVnpJX32/av/uSOA5UClH3n1f/l3Qs1KjL5gDd7NkwIun7jrfT34iWr37JvCPYQc1tMqccd399vWc/tN/epP8gj2qTTfU75uRzLy96iy8/TUnT/7ZfbT7nflsvgh78zQGdB3e7OVoI6WO1078fbQw6dzeXdwGt2+WtLr3I/9o9/tniwMT04vtDWz0rs8zm7/c0L9NyT99/V2/9MO38+S73W8uMsG/yzMedtz7pvKpcJF0w+jEy1+XXv4ndfLdR9/YL9Jb8ePLZul9NvWNmN9LaMMs71qcesboW/Nvv2uW7JfPXqSm/r6/4Prjqx/M3uts2u+yU0jWRlneW6FOROzW7o9NNkZjXrxOjD3/bs7cnXrBj+9Xon5KfoMsX3dYW2fxvTuqKkqVkN99+vqHUv/b+aMFQ/pq98dv5iwAzLeWQeI9bfP+xghcu0EjPE9tI0fBKlJ8atoX2stHW6t4apee3fiQk/dpmxcbG5LnzRhnAvyoiuWGG6oKfTfXXt8QM7svSlzhcowWeiAJ9zjejDHNlpqhPlZEfUgCgIMsePvo/Zo+zO6zlwtVM7KUqmJlLU8VXrl137T+G3g+ol0XZnVFBGXWb2Bm993vqfVPCQYc5CWJdbQTPxqNq7Qn42fdnqY6JGxAvDNZY2dUR6SlkjDVbJQVh9t4C0hvUwxO54wxG78hEVFBSFJFZzk1jujtwI37Zvb3CPFC0nQdSffA6mIicU45bYJTkK1IkjCBSIElwR/rYeVAXOLO9a0Y3je1v4Nn0a6bwy0mG8QTpiqjTokPTukoFfkOwr+lt6+iKJoQHBzEYc+1jzudVe5bNNOhvGd5MwCPr3IN72OdfGbI1OGppw+6DnFtRLxbEXEjHLpes25rmplGcbNTuWF33uTFIN+x3qUeX2Ue3lVqJMSXdMnvzpmvd31ibLmGkSCVp/V1Q9H1SqUSSSvcSaKkXp9vbcu0LA/TlqQTSeIhZXTKWrgjiX4UQtwf39I1JWbvXMIPVtKgz7TtF2bzSRjWsiqeeWlP8hPqJOGxseewfYtIPapUOoGI5tsr5Jmy3xt+QS6fCDMCl0ej5HplCM0hHlOHP/UVNeDSNL7F6kB9KCGF/GDATpKIHprocJTfFm+ArEkCHeFeBisbqAp2H1QV8RU/zkwnXM0smWPS1juXM0npMj8h53j0Ax/roOEO+bmdsmBBPh2t6AoqXKrtIIfYcaSg+OZP6mHLq2umpmn1I9LUO5XrGa6OEu1DuNsvdzPhLr+hvjlG2eEK4vNUhMc1kuO6ghiti+v92LqaHLSGxOSVYTi5EpHgnCbyh5AvuXyYp0uV7TivQ5ehupA1NNaVae/LDFRM0jmXJt5qU28GDvbH49lsNvbLSPeV0fYCz0p20qmnAkfNq7ijkk5ZpGaH5jhCvndlWVcsORv/s38zWHvhJLrSr66ig0pYVuac97ufLtjXF8/mVC1QcZdPp2/W0txO3fR0jlTO03ZdHt56H/Z5vLKXhyPqfa9D2ntbEkZc9J+/+fntRcl0X77+nuV48Pq9fArbGFxeoZEOBijmg0GVatolmHGYNPtwuf2Dmu2QZoOQwLXQ4eH2u9LF02Rcl6Y5dU3AzAF0KYl0T+vkL2K8riJ/5FKbB0eZdxpQr/iKfzXGiGc5Qt9+f7ikb6QbdzMPaI4VHul2X9svdmnPxUH+R6YTjYmrcdtrLLfrEslibuCn5A/f/nw4SOMH+NU4j07f4/323UdbP5SeDYjDEnkiSOM1lrc5Y0OPO0dHx8fHJLcT6i0d4RmhZhoiqnLyz59vp/qW9ePzODcbM2Gz+8yjia3/E9VmVYQbNyzlJvLMs8ZBhWMY+RiPWXB0BVRNwv12Sp5yF3PY4LWJyPTsi9cv+6WLn94lozOk19oYNpfimhclLd2OZx+cKI7jqUV6tqKe9FKJOnYGq+TpgDVeK5HuF822xDLc7u6j1+bzw1SbdYnpVX1yHbZaIfcA+2pyXGeJum5ct1G5LIpIkp1FbZ0Z4OpWEu+2kyYPPVmk50/ascEqNkw3MN9ltBlhL0miKtYcIxEmoRx0SEs/OiIpvdOyEK7ti+2wntEtRB8nhn/ff8MNz4Jd/kYwhngxYLP9dnsJg/lIUJZmFKf7VnhJm/nlAbkx05vd+Vjmsf65WXq/vZ3pz+SvE2/IqaAdbJ9niDMX6CrjMGNWLRD3rcnBwaSBVNVfV1Flj6UqkzhvL97w7jyVtXL+ZiloR4ZyP102+ntmekfyp9TyrMtuDhv7+3sE+87NgQzqBSTRca9/l4Q7yj1/3RnzAFKcwsyeweE7+zlN9QMfYcFqGB1I5VTca8MwjnvrpIo3hb9DJC26s8zwSi778OYUc+5LZn/+0/vSxc/EZ8/PzuaOJKntzuXEavT+5vKdAO5OC2F/cbZTzh1P88Zda9BYtzA7S3LPSU+s//an7bMdgvPBCFmXVq31txPK4f4V3B5DF/2trOHZ5FTeEjzjLkCQ56Sf81Bnvzlk1AkGkqPj9WNuS4S0SPX1wNDsaJHmt/PLvc25Myc9t0sXPMdfvDvfSXAuKWh9mB4uf2zISBBr+46vKCn3U869nT/uEuOeCJISz/GHb85S6mdbiphprZmJGbMxzLZiGPU83eqOHGfcTUPnIOd2HyVWevc8kXZAHfL9YN51FFFctHWttVA0lXGlvny20dk2nZ7PBM5TKmpzyL3BKqsUobuU48Dfz0aKokiShMtCtiq+EqT5zWyNjU7G8LYvzdkdy2LA7J67zow55RWkVSWZfkuo73QVSRaRb7UPjAy/4zCqJK+1lh93Moav16TBTob8c86d5vfc5Tg+L8Ftn7Cn1M8U3HBd1/P6S5Mwnfakk7zRLsdRpZKJBPuU+xknf8jjJuN+kDfubKQSBhq556fUdwaKennj8KNOjOOUrdaZ+WGnkzpzXVVO6W3jdrd/onLhNJ+attSS6fD5WJSY54MiY9H9VPIvV5qo1qmEvnXZOUqqDo4OZKvVqRzxm6Hp2NpJyB9uP9fevwOxRLnL+ZuTG4q0LQ6vI5EVGwlbZwl34TI7IlvSjjqVAwuP4yHpvcNwXb3eqTiiFXYqx/yQUFUGnPy7txckQPYvfuY+j/LXf3cdBDG4pFUupzJd/sjcFsScetlJSJW0Y5iCiASkKP4sCi87HKGPieWTCNDURWHO5ND5G5ihePvmOXSEyVlzWHbT1BGMntvQlCuNsQR+v8Wu/iGewjBsB4Zp6HDFFGHF6fqKBAUoVrsxnU4buiPgSSU1vKeXJWVAtQHpBvbf/y80eBi7kNr5G7Oyoe4AwRBz6RiGm6njM8uPFDxpXVbAupXL8DpyREXpnu+cn46qkqLAOmjyh7xSxq1KGu+8SJTgKGjyhxc01g1gzApPchfmSyXagWej5/VK57JBF8vQRrtdVfBYh0qy6EofIyw9dKhFSQ4bEK33kMLZGki4TdwjOZ/dc1TFOQPyhz+z4QuoP8jjGDWbmyizK9OIZwfQ5h+yzutIINbFUEYoKYKztejcsDtwTnr35MWcqP0MeaIZkNKFe5d05JS8zk14MCeFuWhNyNNrh8s/3aK1o9354BxoPiY4YYCX/CYQARhUFm5PurLYX2T5AUxG5rT6AOYi05JfqJODLr2f2viMgvI+OXlA8MsvDxLAHaD+gfwpBEXepMkZRjupth1AT0Zq3x/BjyAoZ+eIj2BWFQnK1gDKhU/T4YuTlPCvfzxYwgkhKShINzoVqu3No0vh4WAh707RolHlDR7UHiAnCcOEQQuyPMdDn8S3xycZrr/9lt6FX5/AP09OHpMun4SnLZoSK50GdviYxzbPcEItp6tH6MxMLZFd4PUTyHu4XBYxlbmDkycJ3V9+/9X884+/fqdvSubvqe3nVSQ6k2uS7SqxWh3spNJ2INEZqXtleDtimXavk7dHndZYraF2cH190EA1TIy/tZOQ//2PP0ulP/9gTf6vX9N78uDkzHkoYWF2Nb3ylXkSLLaZqGPVinlEE2Qt8hPDay1xFrhUyRFV40YzImPRzoLlb78tXmfw5OS861chHy6oE6enkQ5ZuYzypaQPjwP+1o2uk/lGyv8yICK++jglvBrrUvIPHp8PYEkd68aeb9OFJbTiJH/zEiloTWlS428bR1AYD9A0XlgxlqTTJwSsyf+1njvBY5oSyV/kHvgw3kXaCw2k+eu/JjCv8K3GqXdYVYlPxM1jMO6KrZdxwuQgW0MjSXx3GNzIrdmJ4WmJnbq+h318GTZAnYB43368zPWPX26QH4weKoIiln0oOtQp+Vr+uu4Z0Dqz9drLjq0PezKBSBTPw9H2SdbWv/2+wn1nC5jLDtRrEIeho/83q/VyBbZ4oLwmE9X1aXgJaAVCTSQhf7Qg/+T3P3/7JXMrnjzY9hVBqlnQ8yXMj3s4/2bnoV5Zs2rbPa7Xj+noBcl3k5koKMJO4vAwaGf+mZr+ycnoYRUJbQOGtKAQhdWz5DjIM/DLjG6bajVpyO8YERG7oyTfPfnlz0yuf/KYdNiwdQ0Gp106jS3HmOVvsGoFrMxODG4/gq4MqcS+Im0t2vuvy9TVdqtTOTaXTplXSZcBm5j76EgyrZ0NsfDwLLH2r2mcf3JCmjqM3CUdWVbJI4j57LwuwwNlm5G260BrpoOy4jy4gZMtSZAnncXArkvrdHM6ZrGKHp2cwbrbd41eSNAz3NULh3Gdii75j1OVl+CcpImospica1I/QiiPQ1U3wafmECwCIT1YjJA/Jt0yYylK10m4vxar249hGOdBegee7DgKbl8uhq1sHedcyC/DjOjcnIKUZEsnoktFWW24afSve62Y6JUqH6RVts53HlNhe/oQjVsdr95seq7rNZtsQyw1d3Ovt6KvZ3asU9K9ObEaUeObbtjGspjdwZHcg+5gh8T4hwKKjOtId2p7tRrRQPQgUd+gHUzdcUJeFi0LybWarEqIxG8hapaG0biMFYRElXxOIZcl0Ln+/DHMNlozTHdwXdyzHE5DfQSuxcijIe28dypG2JjNBFHCvoWxomBhNgtaLpurqRhBe+ZjVOU9VQljH9aMJdT1jaIOlqdz0Wh8zZcGEJLDg4kuwjQlHk/iChvRSL6shJNZmS1zL8+iSWxUOvF4E60O4JZHflRJScJ0XLsmCVGLdlGOjo41WA1apzK3cxkQx1cx6fJU6FStT51e3KwdnRg8Nh2J8KyVMXGn0mqLExiBX4rcZh0WvotoHFMPOa6HM9ZoNnIPNxLtI5VGaSTTFTMmsfAxXSwQ6sGaUimt48wOoBZBI4mgLdOfKuqmblxoH/DyG4wWdeKadnxUOVjXLwkml0e03NA7wKxgDaE4b/Vk/zXMnsTDPZ5llkaYpm3c9GQvPKJEm1OL71otCsbGSJo1qLf5Hn5IlDOybh3oLvy220hEjyRsygZet8EM021asayH7scEmk30npyIorL+d0X2G4DmtJbwkcrjq9hYP5vY78VE7/Et/xCuBTmddPxEuA0hEe8KxsJ4Nn01bPJpC0B9+GqqjwWoyeAHCTfXUm4sjMhfdF0QwmptT3asNoFuOXivpvJOC2VeHk/ytwzsDtDcAMvLW+8rdB8vpCw/ggHJfuxufkNfhtkPLVX8+DMXsKhaYf1rY87gxdEMrX/mBMJlYRZ9fQ+byMD0etdTC6UPWSHdeAyPWEH6NDS8r9PiWdhNjz5cx3IILKs9JR35Zn/DdUyBAgUKFCiwOdC85ufQG1p9CZ84DlXPLKwzm94XEgJee1/9DBuANxtoCZ82/uiO91EyvGfG5f0vM1NhHqiCot5dYse1JQX/N/PJRrxUtmBHooBE/qZJesLqF5mSpev5a3cvZQxroN15xxUh6aPcW4IoZr+n66/2+SAOlHF9mfXvdG3zZ1iGWA90AroxjwWvPtaMYGsonC0vodz3uPMBd2mjuEOEavahPLAcN8nLjx0KS82W9qjLEff+q+nV1TROh1tJlzyCdey9gDuq1iMHRGs236Un4zs7mHDQ9BU7izGlP20GoUlOR6gqVthL+d3G3TSC6Crp8JshXUvvsV+58E1wt2m8m9ztYE+F/eLVGtthuD/dK4tiuRbHe+UPMb0IRLrm5ID9G8++W3AnB9XoWfbB+8MPZdjdsGnJe7Eh02ksRd7Tk3bBuGfaO+M+dGr0/9mbwg1s7KmC6wn7sBdmU98vw5b2e3eaybvB3Y7KAl/nrcLuA2YDikswRqyunxwRwLXTUhNxde3mgnssE9uKMHipBhqU4ELZeaAKeBLzMR0FO4nhKXe55w4J3LjMuRvw/2BRIV816iVzH8r2pyLs1k2nQDGsxhbvssXhDe7k+ohNLAtGHcFWoQyDTe0pfTQgcKd11KpDDxBXNo9OuRtYEZATBAIhLbVKUxX26xmWoXrQbrAHyjiLJ8dR7sgZU8C3wB2qN5XyNIB5bjEuafsw0z9GiqibkJvkRgwP8hLb/zwbrnLv12ALNfK+B4u/UL9PLyuEmSdMudv035BXlu4tt7iEO1SIojHx1D45SNK1ukXX1SF2sygrJ/Mzyl1AULjE8iThDsJDwGBV4jSK5QF3mMQa6x7cfQxSCIox71CYtso9LCcrQmD9E+4NyS1AM7i3LbpeomQ45APaUkO47dO13KFWkK1yg+2/al7JYEUGigSN5FbuFJw73DVMz+7KcFLKnURIz4SqTolu8K6Rb8TJZ+MOuzIyeQlPzxEPDCkh6FoKcG+ljOldWN4qP+FuQJuNDggi+KSX1OOxvRzWc0cOB+VueuSmoSs4BRhBje09CDvUyISxMgvgKwn+m38s/le503Jm+hbq2fEBPESHFQ17OqUKhmQLI+nNGK/lTh+9g8sE0EBqhLFpwUraqXY795qnUUBpLeHuQliR+ClI5KnvJUuoIOoRCQxfQby9+se1aZ/AffYJ3KE0OHkUrK/D42dgiZHieLdzX85xjHsC33LB55mnU+4pxv+89HqV+3TZ52OD/C3RR94MmYuv+PzyEo+UOxwUGBRDowmP3qLztJgGilu4L2kb6vPSNDmFR+O8xAQFZJ52j39zh8ktxn0xL/hqJda5lDH8lzSoWnSNGGP8kVg3dJTkK5dmghA2i+BZk2UIMfOzdbqOxjr2nCEPTJPhTmId38m0b9xF+/J9mtgD6oVAsyHE+C3NDuHTsabBkjDc8OwWYnHehg9QbGvAT5CXpUU2xwliT9OakVwLYIMUcux0jNgTFShVNbRTi63VtHCv5YAEgKBWay9xh4ggNpqa1qvJ+A6VqFnuCMlhKYAoKuo6SDJYmdqDdodFQZYSbUMDrtWGA8orSyeo6ABtM4R5dtFqEEUkXfVLjgRbVMFaWlhpUqcNoOwHH9W03kyip7BUYgPm83zXAS0CWec34Bprd6g7p+dJUbsmmlZWmKZFMr246R55o0iiPob8Sj4IaskB6qqgB/3Gggfpz4MeJNFQnprND3SdgWbxxMz3R9pPnKYPCu0DvxPevsCe3TCU+SnIHbBJhEPpEh1PLxMXgjYk3WmveiPzZG40c6Ev40uwKQniG66aoeVX/XHoWryhkw8QbFuChBsldE0Hi1fsfhgzJIqguUGLCyJNDa4v0gfkEcOT77Ca3rmQdBgSFyLtBfs0ALm6QLdHEegQViCK6YbndkOAaxQF6269b6+3ALsYLzyYTA7CRUvyhq5GtRoPPnaPHrDmljfj9GemsTiIfEw/c2NWXGT2iDCJM5UXw3hRaqb10t7xMJ5MJvw408j+wAsD8s2dQt1/ATtk2+qCps3pEwH+NTTE8lWTybo0Fv9/wQcSUWqOv4c2aEXL54JON2KG7lX5xjjN145mVJNFGLSS4w1a0fK50O8F0yAebmy5c4ECBQoUKFCgQIECBQoUKFCgQIECBQoUKFCgQIECBQoU+Hz4Pw+f3zOiFW7AAAAAAElFTkSuQmCC" alt="landing logo"/> */}
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
            <div className = "back-arrow"></div>
          </div>
          <div className= "host-middle">
          <h3>Host Game</h3>
            <input
              name="name"
              value={this.state.name}
              onChange={e => this.handleChange(e, "name")}
              placeholder="Enter Name"
              type="text"
            />
            <p>How many rounds do you want to play MOFO?</p>
            <div className="roundsbuttons">
              <button onClick={() => this.setRound(3)} className="landing-button three">Three Rounds</button>
              <button onClick={() => this.setRound(5)} className="landing-button five">Five Rounds</button>
              <button onClick={() => this.setRound(7)} className="landing-button seven">Seven Rounds</button>

            </div>
            <button className='landing-button' onClick={() => this.backFN()}>Go Back</button>

            <button className='landing-button' onClick={() => this.hostGame()} >Host Game</button>
          </div>
          <div className= "host-bottom"></div>
          
        </div>
      );
    } else if (this.state.showJoin === true) {
      return (
        <div className="landing-container">
          <h3>Join Game</h3>
          <input
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e, "name")}
            placeholder="Enter Name"
            type="text"
          />
          <input
            name="code"
            onChange={e => this.handleChange(e, "code")}
            placeholder="Enter Code"
            type="number"
          />
          <button className='landing-button' onClick={() => this.backFN()}>Go Back</button>

          <button className='landing-button' onClick={() => this.joinGame()}>Join Game</button>
        </div>
      );
    }
  }
}

export default Landing;
