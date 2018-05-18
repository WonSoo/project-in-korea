import React, { PureComponent } from 'react';
import styled from 'styled-components';
import change_image from '../../../res/change_image.png'

const RecuritPosterInputStyle = styled.input`
    width: 100%;
    height: 100%;
    display: none;
`;


export class RecuritPosterInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };

    this._handleImageChange = this._handleImageChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      imagePreviewUrl: this.props.value
    })
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    this.props.onChange(file);

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={{width: "192px", height: "271px"}} src={imagePreviewUrl} />);
    }

    return (
      <div onClick={()=>{
        console.log(this.upload)
        this.upload.click()}} style={{width: "192px", height: "271px", border: "solid 1px #a9a9a9", boxSizing: "border-box", display: "inline-block", position: "relative", background: "white"}}>
        {
          $imagePreview 
          ? ($imagePreview)
          : null
        }
        <input
          style={{display: "none"}}
          ref={(ref) => this.upload = ref}
          type="file" onChange={this._handleImageChange}/>
        <img
          src={change_image}
          style={{width: "63px", height: "49px", zIndex: "2", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)"}}
        />
      </div>
    )
  }
}
