import React, { Fragment, Component } from 'react';
import CssBaseLine from '@material-ui/core/CssBaseLine';
import { connect } from 'react-redux';
import AppBar from '../appBar/AppBar';

function Page(props){
    return (
        <Fragment>
            <CssBaseLine />
            <AppBar />
        </Fragment>
    );
}

class Results extends Component{
    render(){
        const { suggestions } = this.props;
        console.log(suggestions);
        
        return(
            <Page  suggestions = {suggestions} />
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        suggestions: state.suggestions
    };
};

const wrapper = connect(mapStateToProps);
const component = wrapper(Results);

export default component;