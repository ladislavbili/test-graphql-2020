import React, { Component } from 'react';
import { Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toSelArr } from '../../helperFunctions';
import Select from 'react-select';
import chroma from 'chroma-js';

const selectStyleColored = {
  control: base => ({
    ...base,
    minHeight: 30,
    backgroundColor: 'white',
  }),
  dropdownIndicator: base => ({
    ...base,
    width:0,
    color: "transparent",
    padding: 0,
  }),
  clearIndicator: base => ({
    ...base,
    padding: 4,
  }),
  multiValue: (base, {data}) => {
    const color = chroma(data.color);
    return {
      ...base,
      color:'#FFF',
      padding:'0px 5px',
      backgroundColor: color.alpha(0.1).css(),
      borderRadius: 0,
    };
  },
  multiValueLabel: (base, { data }) => ({
    ...base,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
  valueContainer: base => ({
    ...base,
    padding: '0px 6px',
    borderRadius: 0
  }),
  input: base => ({
    ...base,
    margin: 0,
    padding: 0,
    backgroundColor: 'inherit',
    borderRadius: 0
  }),
  indicatorSeparator: base => ({
    ...base,
    width: 0,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isSelected
      ? data.color
      : isFocused
      ? color.alpha(0.1).css()
      : null,
      color: isSelected
      ? chroma.contrast(color, 'white') > 2
      ? 'white'
      : 'black'
      : data.color,

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  singleValue: (styles, { data }) =>{
    return ({ ...styles, color:'#FFF',padding:'0px 5px', backgroundColor: data.color });
  },
};

export default class EditTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      tags: [],
    }
  }

  UNSAFE_componentWillReceiveProps(props){
    if(this.storageLoaded(props) && !this.storageLoaded(this.props)){
      this.setData(props);
    }
  }

  componentWillMount(){
    if(this.storageLoaded(this.props)){
      this.setData(this.props);
    }
  }

  setData(props){
    if( props.taskData.data ){
      const task = props.taskData.data.task;
      this.setState({
        title: task.title,
        tags: toSelArr(task.tags)
      })
    }
  }

  storageLoaded(props){
    return !props.taskData.loading &&
    !props.tagsData.loading
  }

  render() {
    const { data: taskData, loading: loadingTask, error: taskError } = this.props.taskData;
    const { data: tagsData, loading: loadingTags, error: tagsError } = this.props.tagsData;

    if ( loadingTask || loadingTags ) return ( <p>LOADING</p> );
    if ( taskError || tagsError ){
      console.log(taskError);
      console.log(tagsError);
      return ( <p>ERROR in loading</p> )
    }
    if (!taskData) return ( <p>Task not found</p> );
    if (!tagsData) return ( <p>Tags not found</p> );
    return (
      <div className="flex m-5">
        <Button
          color="link"
          onClick={ () => {
            this.props.history.goBack();
          }}
          >
          Go back
        </Button>
        <FormGroup row>
          <Label for="title" sm={2}>Task title</Label>
          <Col sm={10}>
            <Input id="title" placeholder="Názov úlohy" value={this.state.title} onChange={ (e) => this.setState({ title: e.target.value }) } />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={2}>Tags</Label>
          <Col sm={10}>
            <Select
              placeholder="Zvoľte tagy"
              value={this.state.tags}
              isMulti
              onChange={(tags)=>this.setState({tags})}
              options={toSelArr(tagsData.tags)}
              styles={selectStyleColored}
              />
          </Col>
        </FormGroup>
        <Button
          color="primary"
          onClick={ () => {
            this.props.updateTask({ variables: {
              id: parseInt(this.props.match.params.id),
              title: this.state.title,
              tags: this.state.tags.map((tag) => tag.id)
            } }).then( ( response ) => {
              this.props.history.goBack();
            }).catch( (err) => {
              console.log(err.message);
            });
          }}
          >
          Save
        </Button>
      </div>
    );
  }
}
