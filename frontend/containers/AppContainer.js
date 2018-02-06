import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';

const AppContainer = ({ name }) => {
    return (
        <div>
            <Table/>
        </div>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
