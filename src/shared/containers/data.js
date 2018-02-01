/**
 * Created by Anton on 25.01.2018.
 */
import React from 'react'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './../store/map_to_props';
import { withRouter } from 'react-router-dom';
import { FetchData } from './../store/methods';

const GetRandomValue = () => Math.floor((Math.random() * 999999) + 1);

class Data extends React.Component
{
   constructor(props){
       super(props);
       this.state = {value:" "};

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
   }


    static async fetchData({ store })
    {
        await FetchData(store.dispatch);
    }


    componentDidMount()
    {
        // Check to prevent data loading when SSR
        if (!this.props.load.initialized)
        {
            console.log("Client load");
            this.props.onLoad();
        }
    }

    componentWillUnmount()
    {
        // Clear initialized flag to load new data next time
        this.props.onUnmount();
    }


    handleChange(e) {
        this.setState({value: e.target.value });
        console.log(this.state.value);
    };

    handleSubmit(e) {
        this.props.onAdd(this.state.value);
        this.setState({value:''});
        e.preventDefault();
    }

    render()
    {
        return (
            <div>
                <h1>Data</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Data" />
                </form>
                <table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Value</td>
                                <td/>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.load.ready ? Object.keys(this.props.items).map(key =>
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{this.props.items[key].value}</td>
                                <td>
                                    <button onClick={e =>
                                        {e.preventDefault(); this.props.onUpdate(key, GetRandomValue())}}>
                                        Update
                                    </button>
                                    <button onClick={e => {e.preventDefault(); this.props.onRemove(key)}}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ) : <tr><td><p>Loading</p></td></tr>}
                        </tbody>
                    </table>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Data));
