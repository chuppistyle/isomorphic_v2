import React,{Component} from 'react';
import * as d3 from 'd3';
import '../css/gantt.css'
import NetWorkGraph from '../NetWorkGraph';
import {GRAPH_DATA} from '../Data/NetWorkGraph_Data'



class GanttContainer extends Component{

    render(){


        return(
            <div>
                <div className='gantt'>
                   <h2>Exapmle GRAPH</h2>
                    <NetWorkGraph data={GRAPH_DATA}/>
                </div>
            </div>

        )
    }
}

export default GanttContainer
