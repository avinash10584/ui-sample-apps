/* eslint-disable react/no-typos */
import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, deleteItems } from '../actions/itemActions';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItems(id);
    }

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id: id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, id)}
                                    >
                                    &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    item: state.item,
});

/*
    Redux connect can only take Redux actions which are pure objects,
    thunk allows it to receive functions as Redux actions on connect()

    This reduces complexity and logic when dispatching redux actions directly from components.
    Now actions can be dispatched from outside component and,
    There is no need to pass dispatch around as thunk takes care of it.

    const mapNoThunkActionsToProps = (dispatch, state) => ({
    getItemsFn: () => getItems(dispatch, state),
});
*/

export default connect(mapStateToProps, {
    getItems, deleteItems,
})(ShoppingList);
