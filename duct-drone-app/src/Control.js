import React from 'react';
import ReactNipple from 'react-nipple';
 
import './Control.css';
// optional: include the stylesheet somewhere in your app
class Control extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
	render() {
        var isActive = true;
        return (
            <div>
                <ReactNipple
                    // supports all nipplejs options
                    // see https://github.com/yoannmoinet/nipplejs#options
                    options={{ size: 200, mode: 'static',color: 'blue', position: { top: '50%', left: '50%' } }}
                    // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                    // all events supported by nipplejs are available as callbacks
                    // see https://github.com/yoannmoinet/nipplejs#start
                    onMove={(evt, data) => console.log(evt, data)}
                />
            </div>
        );
	}
}
export default Control;