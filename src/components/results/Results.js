import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

function Page(props){
    return (
        <Fragment>
            Results
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