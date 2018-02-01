import React,{Component} from 'react'
import * as d3 from "d3";




let nodes = {
};
const nodeHandle = (DATA) => {
    DATA.nodes.forEach(elem=>{
        nodes[elem.id] = Object.assign({children:[], parents:[],layer: -1,
            position: { x: 0, y: 0 }},  elem);
    });

    DATA.links.forEach(elem=>{
        nodes[elem.source].children.push(elem.target);
        nodes[elem.target].parents.push(elem.source);
    });

    const layersList = {};

    const parentNodesBackup = Object.assign({}, nodes);
    let currentKeys;
    let previousKeysLength = -1;
    while ((currentKeys = Object.keys(parentNodesBackup)).length > 0)
    {
        if (previousKeysLength == currentKeys.length)
        {
            console.log("Infinite loop");
            console.log(parentNodesBackup);
            return;
        }
        previousKeysLength = currentKeys.length;

        currentKeys.forEach(key =>{
            const node = parentNodesBackup[key];
            if(node.parents.length === 0)
            {
                SetLayer (node, layersList, 0);
                delete parentNodesBackup[key];
            }
            else
            {
                let layer = -1;
                for (let i = node.parents.length - 1; i >= 0; i--)
                {
                    const parentKey = node.parents[i];
                    const parent = nodes[parentKey];
                    if (parent.layer === -1)
                    {
                        layer = -1;
                        break;
                    }
                    else if(parent.layer > layer)
                    {
                        layer = parent.layer;
                    }
                }

                if(layer > - 1)
                {
                    SetLayer (node, layersList, layer + 1);
                    delete parentNodesBackup[key];
                }
            }
        });
    }

    const layersListKeys = Object.keys(layersList);

    let maxLayerSize = 0;
    layersListKeys.forEach(key => {
        const nodes = layersList[key];
        if (nodes.length > maxLayerSize)
        {
            maxLayerSize = nodes.length;
        }
    });

    const height = (maxLayerSize - 1) * STEP.y;

    layersListKeys.forEach((key, index) => {
        const nodes = layersList[key];
        const len = nodes.length;

        const loacalHeight = (len - 1) * STEP.y;
        const yOffset = (height - loacalHeight) * 0.5;

        const x = index * STEP.x;
        nodes.forEach((node, j) => {
            node.position.x = x;
            node.position.y = yOffset + j * STEP.y;
        })
    });
    return nodes;


};


const STEP = {
    x: 150,
    y: 100
};

const RADIUS = 20;

const SetLayer = (node, layersList, value) =>
{
    node.layer = value;
    if (Array.isArray(layersList[value]))
    {
        layersList[value].push(node);
    }
    else
    {
        layersList[value] = [ node ];
    }
};

const RenderConnections = (items) =>
{
    const result = [];
    let counter = 0;
    Object.keys(items).forEach(key => {
        const item = items[key];
        if (item.parents.length > 0)
        {
            item.parents.forEach(parentKey => {
                const parentNode = items[parentKey];
                let xA = parentNode.position.x;
                let xB = item.position.x;
                let yA = parentNode.position.y;
                let yB= item.position.y;

                let dx = xB-xA;
                let dy = yB-yA;

                let d = Math.sqrt(dx * dx + dy * dy);
                let d2 = d - RADIUS;
                let ratio = d2 / d;
                dx = (xB - xA) * ratio;
                dy = (yB - yA) * ratio;

                let x = xA + dx;
                let y = yA + dy;


                result.push(
                    <line  key={counter} x1={parentNode.position.x} y1={parentNode.position.y} x2={x} y2={y}
                          fill="none" stroke="black" strokeWidth="2" markerEnd="url(#Triangle)" />
                );
                counter++;
            });
        }
    });



    return result;
};

class NetworkGraph extends Component{

    constructor(props){
        super();
    }


    componentDidMount() {
        const svg = d3.select(this.drawing);
        const group = d3.select(this.group);

        svg.call(d3.zoom().on("zoom", () => group.attr("transform", d3.event.transform)));
    }


    render(){
        const items = nodeHandle(this.props.data);
        return(
            <svg ref={r => this.drawing = r}
                 width="100%"
                 height="500"
                 xmlns="http://www.w3.org/2000/svg">

                <defs>
                    <marker id="Triangle" viewBox="0 0 10 10" refX="9" refY="5"
                            markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>

                <rect width='100%' height="100%" fill="#eee" />

                <g transform="translate(146,121) scale(1)"  ref={r => this.group = r}>
                    {RenderConnections(items)}
                    {
                        Object.keys(items).map(key => {
                            const item = items[key];
                            return (
                                <g  key={key} >
                                    <circle cx={item.position.x}  cy={item.position.y} r={RADIUS} fill="white" stroke='black' />
                                    <text x={item.position.x} y={item.position.y} textAnchor="middle" stroke="black" strokeWidth="1px" dy=".3em">{key}</text>
                                </g>
                            )
                        })
                    }
                </g>
            </svg>
        )
    }
}
export default NetworkGraph
