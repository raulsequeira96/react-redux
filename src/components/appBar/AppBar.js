import React, { Fragment, Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AutoComplete from '../Autocomplete/AutoComplete';
import findSuggestions from '../../redux/actions/findSuggestions';
import { connect } from 'react-redux';
import './style.css';

function Page(props){
    const {
        text,
        suggestions,
        onChangeText,
        onChangeSelection
    } = props;
   
    return(
        <AppBar position="static">
            <Toolbar className = "appbar">
                <Typography variant="h6" color="inherit">
                    Raul
                </Typography>

                <AutoComplete 
                text={text}
                suggestions = {suggestions}
                onChangeText={onChangeText}
                onChangeSelection={onChangeSelection}
                />

                <AccountCircle />
            </Toolbar>
        </AppBar>
    );
}

class IAppBar extends Component{

    constructor(props){
        super(props);
        this.state={ text: '' };
    }

    onChangeText = (text)=>{
        this.setState({text});
        this.props.findSuggestions(text);
    }

    onChangeSelection = (text)=>{

    }

    render(){
        const { text } = this.state;
        const { suggestions } = this.props;

        return(
            <Page 
            text={text}
            suggestions={suggestions}
            onChangeText={this.onChangeText}
            onChangeSelection={this.onChangeSelection}
            />
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        suggestions: state.suggestions
    };
};

const mapDispatchToProps = { findSuggestions };

const wrapper = connect(mapStateToProps, mapDispatchToProps);
const component = wrapper(IAppBar);

export default component;