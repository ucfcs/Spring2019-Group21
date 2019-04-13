import React, { Component } from 'react';
import { ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import './Sidebar.css';

class Sidebar extends React.Component {
	render() {
		return (
		<ToggleButtonGroup vertical type="checkbox">
			<ToggleButton variant="outline-primary" size="sm" value={1}>Autonomous</ToggleButton>
			<ToggleButton variant="outline-primary" size="sm" value={2}>Mapping</ToggleButton>
			<ToggleButton variant="outline-primary" size="sm" value={3}>Logging</ToggleButton>
		</ToggleButtonGroup>
		);
	}

}
export default Sidebar;