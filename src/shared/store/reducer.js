/**
 * Created by Anton on 19.04.2017.
 */
import { TEST_DATA_ACTIONS } from './actions';

const DEFAULT_STATE = {
    items: {},
    load: { ready: false, error: null, initialized: false },
    add: { ready: true, error: null },
    update: { ready: true, error: null },
    remove: { ready: true, error: null },
};

const test_data = (state = DEFAULT_STATE, action) => {
    let items;
    switch (action.type)
    {
        case TEST_DATA_ACTIONS.LOAD_REQUEST:
            return Object.assign({}, state, {
                load: { ready: false, error: null, initialized: state.load.initialized }
            });
        case TEST_DATA_ACTIONS.LOAD_OK:
            return Object.assign({}, state, {
                load: { ready: true, error: null, initialized: true },
                items: action.items
            });
        case TEST_DATA_ACTIONS.LOAD_FAIL:
            return Object.assign({}, state, {
                load: { ready: true, error: action.error, initialized: state.load.initialized },
            });

        case TEST_DATA_ACTIONS.ADD_REQUEST:
            return Object.assign({}, state, {
                add: { ready: false, error: null }
            });
        case TEST_DATA_ACTIONS.ADD_OK:
            items = Object.assign({}, state.items);
            items[action.item.id] = action.item;
            return Object.assign({}, state, {
                add: { ready: true, error: null },
                items: items
            });
        case TEST_DATA_ACTIONS.ADD_FAIL:
            return Object.assign({}, state, {
                add: { ready: true, error: action.error }
            });

        case TEST_DATA_ACTIONS.UPDATE_REQUEST:
            return Object.assign({}, state, {
                update: { ready: false, error: null }
            });
        case TEST_DATA_ACTIONS.UPDATE_OK:
            items = Object.assign({}, state.items);
            items[action.item.id] = action.item;
            console.log(action.item);
            return Object.assign({}, state, {
                update: { ready: true, error: null },
                items: items
            });
        case TEST_DATA_ACTIONS.UPDATE_FAIL:
            return Object.assign({}, state, {
                update: { ready: true, error: action.error },
            });

        case TEST_DATA_ACTIONS.REMOVE_REQUEST:
            return Object.assign({}, state, {
                remove: { ready: false, error: null }
            });
        case TEST_DATA_ACTIONS.REMOVE_OK:
            items = Object.assign({}, state.items);
            delete items[action.id];
            return Object.assign({}, state, {
                remove: { ready: true, error: null },
                items: items
            });
        case TEST_DATA_ACTIONS.REMOVE_FAIL:
            return Object.assign({}, state, {
                remove: { ready: true, error: action.error },
            });

        case TEST_DATA_ACTIONS.UNMOUNT:
            return Object.assign({}, state, {
                load: { ready: true, error: null, initialized: false }
            });

        default:
            return state;
    }
};

export default test_data;
