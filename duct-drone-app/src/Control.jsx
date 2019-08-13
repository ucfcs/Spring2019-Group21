import React from 'react';
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
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
    const isActive = true;
    return (
      <div id="analog-wrapper">
        <ReactNipple
                    // supports all nipplejs options
                    // see https://github.com/yoannmoinet/nipplejs#options
          options={{
            size: 150, mode: 'static', color: 'blue', position: { top: '50%', left: '50%' },
          }}
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
