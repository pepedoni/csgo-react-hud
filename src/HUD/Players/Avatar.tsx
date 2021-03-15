import React from 'react';
import { isDev, port } from '../../api/api';
import { actions } from '../../App';

import { avatars } from './../../api/avatars';
import { Skull } from './../../assets/Icons';

interface IProps {
  steamid: string,
  slot?: number,
  height?: number,
  width?: number,
  showSkull?: boolean,
  showCam?: boolean,
  webcamurl?: string
}
interface IState {
  enableCams: boolean
}
export default class Avatar extends React.Component<IProps, IState> {
  state = {
    enableCams: !!this.props.showCam
  }
  componentDidMount(){
    actions.on("toggleCams", () => {
      this.setState({enableCams: !this.state.enableCams})
  });
  }
  render(){
    const { enableCams } = this.state;

    let {webcamurl} = this.props
    //const url = avatars.filter(avatar => avatar.steamid === this.props.steamid)[0];
    const avatarData = avatars[this.props.steamid];
    if(!avatarData || !avatarData.url){
        return '';
    }
    const slot = this.props.slot === 0 ? 10 : this.props.slot || 1;

    const leftPosition = - 150*((slot-1)%5);
    const topPosition = slot > 5 ? -150 : 0;
    return (
      <div className={`avatar`}>
          {
            (this.state.enableCams && webcamurl) ? <div  id="cameraFeed" style={{ display: enableCams ? 'block' : 'none'}}><img src={webcamurl}/></div> 
            : this.props.showSkull ? <Skull height={this.props.height} width={this.props.width} /> : <img src={avatarData.url} height={this.props.height} width={this.props.width} alt={'Avatar'} />
          }
          
      </div>
    );
  }

}
