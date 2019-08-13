import React, { Component } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './Sidebar.css';

class Sidebar extends Component {
  state = {
    autonomous: false,
    mapping: false,
    logging: false,
  };

  onChange = (e) => {
    // this.setState({e[1]: e[1]});
    console.log(e[3]);
    const triggeredBtn = e[3];
    if(triggeredBtn === 'autonomous') {
      this.setState({autonomous: !this.state.autonomous});
    }
    else if(triggeredBtn === 'mapping') {
      this.setState({mapping: !this.state.mapping});
    }
    else
      this.setState({logging: !this.state.logging});
  }

  render() {
    const { autonomous, mapping, logging } = this.state;
    // console.log(props);
    return (
      <ToggleButtonGroup vertical type="checkbox" onChange={this.onChange} value={[ autonomous, mapping, logging ]}>
        <ToggleButton variant={"outline-primary " + (autonomous ? 'active' : null )} size="sm" value="autonomous">Autonomous</ToggleButton>
        <ToggleButton variant={"outline-primary "  + (mapping ? 'active' : null )} size="sm" value="mapping">Mapping</ToggleButton>
        <ToggleButton variant={"outline-primary " + (logging ? 'active' : null )}  size="sm" value="logging">Logging</ToggleButton>
      </ToggleButtonGroup>
    );
  }
}
export default Sidebar;
