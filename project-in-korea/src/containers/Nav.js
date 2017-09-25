import React, { Component } from 'react';
import '../res/App.css';
import Home from '../res/images/icons/home.png';
import Recruit from '../res/images/btns/bt_recruit.png';
import HowMe from '../res/images/btns/bt_howme.png';
import Display from '../res/images/btns/bt_display.png';
import WeDo from '../res/images/btns/we_do.png';




class Nav extends Component {
  render() {
    return (
      <div className="App">
          <nav>
              <a href="#" className="a-button"><img className="icon" src={Home}/></a>
              <a href="#" className="a-button"><img className="icon" src={Recruit}/></a>
              <a href="#" className="a-button"><img className="icon" src={HowMe}/></a>
              <a href="#" className="a-button"><img className="icon" src={Display}/></a>
              <a href="#" className="a-button"><img className="icon" src={WeDo}/></a>
          </nav>
      </div>
    );
  }
}
export default Nav;
