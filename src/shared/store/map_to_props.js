/**
 * Created by Anton on 19.04.2017.
 */
import { Load, Add, Update, Remove, FetchData } from './methods';
import { TEST_DATA_ACTIONS } from './actions';

export const mapStateToProps = (state) => {
    return {
        items: state.test_data.items,
        load: state.test_data.load,
        add: state.test_data.add,
        update: state.test_data.update,
        remove: state.test_data.remove,
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onFetchData: async () => await FetchData(dispatch),
        onLoad: () => Load(dispatch),
        onAdd: (value) => Add(dispatch, value),
        onUpdate: (id, value) => Update(dispatch, id, value),
        onRemove: (id) => Remove(dispatch, id),
        onUnmount: () => dispatch({type: TEST_DATA_ACTIONS.UNMOUNT})
    }
};
