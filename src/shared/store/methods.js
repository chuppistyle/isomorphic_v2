/**
 * Created by Anton on 25.06.2017.
 */
import { TEST_DATA_ACTIONS } from './actions';
import "es6-promise/auto";
import 'isomorphic-fetch';


export const FetchData = async (dispatch) =>
{
    const response = await fetch('http://localhost:3000/api?type=load');

    if (response.status >= 400) {
        dispatch({
            type: TEST_DATA_ACTIONS.LOAD_FAIL,
            error: "Bad response from server"
        });
    }
    const data = await response.json();

    if (data.status == 0)
    {
        dispatch({
            type: TEST_DATA_ACTIONS.LOAD_OK,
            items: data.items
        });
    }
    else
    {
        dispatch({
            type: TEST_DATA_ACTIONS.LOAD_FAIL,
            error: data.error
        });
    }
};

export const Load = (dispatch) =>
{
    dispatch({type: TEST_DATA_ACTIONS.LOAD_REQUEST});
    fetch('http://localhost:3000/api?type=load')
        .then(response => {
            if (response.status >= 400) {
                dispatch({
                    type: TEST_DATA_ACTIONS.LOAD_FAIL,
                    error: "Bad response from server"
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.status == 0)
            {
                dispatch({
                    type: TEST_DATA_ACTIONS.LOAD_OK,
                    items: data.items
                });
            }
            else
            {
                dispatch({
                    type: TEST_DATA_ACTIONS.LOAD_FAIL,
                    error: data.error
                });
            }
        });
};

export const Add = (dispatch, value) => {
    dispatch({type: TEST_DATA_ACTIONS.ADD_REQUEST});
    fetch('http://localhost:3000/api?type=add&value='+value)
        .then(response => {
            if (response.status >= 400) {
                dispatch({
                    type: TEST_DATA_ACTIONS.ADD_FAIL,
                    error: "Bad response from server"
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.status == 0)
            {
                dispatch({
                    type: TEST_DATA_ACTIONS.ADD_OK,
                    item: data.item
                });
            }
            else
            {
                dispatch({
                    type: TEST_DATA_ACTIONS.ADD_FAIL,
                    error: data.error
                });
            }
        });
};

export const Update = (dispatch, id, value) => {
    dispatch({type: TEST_DATA_ACTIONS.UPDATE_REQUEST});
    fetch('http://localhost:3000/api?type=update&id='+id+'&value='+value)
        .then(response => {
            if (response.status >= 400) {
                dispatch({
                    type: TEST_DATA_ACTIONS.UPDATE_FAIL,
                    error: "Bad response from server"
                });
            }
        return response.json();
    })
        .then(data => {
            if (data.status == 0)
            {
                dispatch({
                    type: TEST_DATA_ACTIONS.UPDATE_OK,
                    item: data.item
                });
            }
            else
            {
                dispatch({
                    type: TEST_DATA_ACTIONS.UPDATE_FAIL,
                    error: data.error
                });
            }
        });
};


export const Remove = (dispatch, id) => {
    dispatch({type:TEST_DATA_ACTIONS.REMOVE_REQUEST});
    fetch('http://localhost:3000/api?type=remove&id='+id)
        .then(response => {
        if (response.status >= 400) {
            dispatch({
                type: TEST_DATA_ACTIONS.REMOVE_FAIL,
                error: "Bad response from server"
            });
        }
        return response.json();
    })
        .then(data => {
            if (data.status == 0)
            {
                dispatch({
                    type: TEST_DATA_ACTIONS.REMOVE_OK,
                    id: data.id
                });
            }
            else
            {
                dispatch({
                    type: TEST_DATA_ACTIONS.REMOVE_FAIL,
                    error: data.error
                });
            }
        });
};
